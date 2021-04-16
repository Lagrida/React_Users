import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { adminstrationStyle } from '../../styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import {Alert, AlertTitle} from '@material-ui/lab';
import axios from 'axios';
import {URL_ADMIN_BACKEND} from '../../backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import DashboardBar from './components/DashboradBar';
import SimpleModal from '../components/SimpleModal';
import CategoryIcon from '@material-ui/icons/Category';
import CatForm from './components/CatForm';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    Button,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
  } from '@material-ui/core';
const errorInit = {
    message:"",
    errors: {
    }
}
const initCat = {
    title: '',
    o_rder: 1
};
const initHelper2 = {
    loading: false,
    success: false
}
function Cats(){
    const [openModal, setOpenModal] = useState(() => false);
    const [openModal2, setOpenModal2] = useState(() => false);
    const [errorObj, setErrorObj] = useState(() => errorInit);
    const [cat, setCat] = useState(() => initCat);
    const [getCats, setGetCats] = useState(() => []);
    const [helper, setHelper] = useState(() => ({
        isError: false,
        error: {},
        loading: false,
        fulfilled: false
    }));
    const [helper2, setHelper2] = useState(() => initHelper2);
    const classes = makeStyles(theme => adminstrationStyle(theme)).call(null);
    const loadData = async () => {
        setHelper(d => ({...d, loading: true}));
        await axios.get(URL_ADMIN_BACKEND + 'get_cats')
        .then(response => {
            setGetCats(response.data);
            setHelper(d => ({...d, loading: false, fulfilled: true}));
        })
        .catch(error => {
            if(error.response){
                setHelper(d => ({...d, isError: true, error: error.response.data}));
            }else{
                setHelper(d => ({...d, isError: true, error: {message: error.message}}));
            }
        })
        .finally(() => {
            setHelper(d => ({...d, loading: false}));
        });
    }
    useEffect(() => {
        loadData();
    }, []);
    const addCat = async event => {
        event.preventDefault();
        setErrorObj(errorInit);
        setHelper2(d => ({...d, loading: true}));
        axios.post(URL_ADMIN_BACKEND + 'add_cat', cat)
        .then(response => {
            setCat(initCat);
            setErrorObj(errorInit);
            setHelper2({loading: false, success:true});
            setOpenModal(false);
            loadData();
        })
        .catch(error => {
            if(error.response){
                let theErrorObj = errorInit;
                const errorData = error.response.data;
                theErrorObj.message = errorData?.message || "Error";
                if(errorData.errors){
                    theErrorObj.errors = errorData.errors;
                }
                setErrorObj(theErrorObj);
            }else{
                setErrorObj(d => ({...d, message: error.message}));
            }
        })
        .finally(() => {
            setHelper2(initHelper2);
        });
    }
    const updateCat = async (event, id) => {
        event.preventDefault();
        setErrorObj({});
        setTimeout(() => {
            setOpenModal2(false);
        }, 3000);
    }
    const modalClose = () => {
        setOpenModal(false);
    }
    const modalClose2 = () => {
        setOpenModal2(false);
    }
    const findError = name => {
        if(name in errorObj.errors){
            return {
                match: true,
                message: "* " + errorObj.errors[name].join(" ")
            }
        }
        return {
            match: false,
            message: "" 
        }
    }
    return(
        <div style={{marginTop: 90}}>
            <DashboardBar title="Administration Categories" />
            <Box>
                <div className={classes.main}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <Button
                        color="primary"
                        onClick={() => setOpenModal(true)}
                        variant="contained">
                        Add Category
                    </Button>
                    <SimpleModal open={openModal} handleClose={modalClose} title={<><h2><CategoryIcon /> Add Category</h2></>}>
                        <div style={{ maxWidth: 500, minWidth:300, width: 400 }}>
                                {errorObj.message != "" && 
                                <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                                    <AlertTitle><b>{errorObj.message}</b></AlertTitle>
                                </Alert>}
                                <form onSubmit={addCat}>
                                    <CatForm cat={cat} setCat={setCat} findError={findError} />
                                    <Box my={2}>
                                        <Button
                                            disabled={helper2.loading}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary">
                                            Add Cat
                                        </Button>
                                        {helper2.loading && <div style={{ textAlign:"center", marginTop:'20px' }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                                    </Box>
                                </form>
                        </div>
                    </SimpleModal>
                </div>
                <div className={classes.main}>
                    <Box>
                    {helper.isError && 
                        <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                            <AlertTitle><b>{helper.error.message}</b></AlertTitle>
                        </Alert>}
                    </Box>
                    <Box style={{ mt: 3 }}>
                        <Card style={{ marginTop: '10px' }}>
                            <PerfectScrollbar>
                                <Box style={{ minWidth: 1050 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Order</TableCell>
                                                <TableCell>Title</TableCell>
                                                <TableCell>Created at</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {helper.loading &&
                                                <TableRow hover>
                                                    <TableCell colSpan={7}>
                                                        <div style={{ textAlign:"center", padding: '10px', fontSize: '20px' }}><CircularProgress size={28} color="primary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>
                                                    </TableCell>
                                                </TableRow>
                                            }
                                            {(helper.fulfilled && !helper.loading) && 
                                                getCats.map((getCat, index) => 
                                                    <TableRow hover key={index}>
                                                        <TableCell>{getCat.id}</TableCell>
                                                        <TableCell>{getCat.o_rder}</TableCell>
                                                        <TableCell>{getCat.title}</TableCell>
                                                        <TableCell>{getCat.created_at}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title="Edit" placement="top">
                                                                <Fab color="primary" size="small" onClick={() => setOpenModal2(true)} aria-label="edit" style={{color:"#ffffff", marginRight: "10px"}}>
                                                                    <EditOutlinedIcon />
                                                                </Fab>
                                                            </Tooltip>
                    <SimpleModal open={openModal2} handleClose={modalClose2} title={<><h2><CategoryIcon /> Modify Category</h2></>}>
                        <div style={{ maxWidth: 500, minWidth:300 }}>
                                <form onSubmit={event => updateCat(event, getCat.id)}>
                                    <CatForm cat={getCat} setCat={setCat} />
                                    <Box my={2}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary">
                                            modify Cat
                                        </Button>
                                    </Box>
                                </form>
                        </div>
                    </SimpleModal>
                                                            <Tooltip title="Delete" placement="top">
                                                                <Fab size="small" aria-label="edit" style={{background: "#e33371", color:"#ffffff", marginRight: "10px"}}>
                                                                    <DeleteIcon />
                                                                </Fab>
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </Box>
                            </PerfectScrollbar>
                        </Card>
                    </Box>
                </div>
            </Box>
        </div>
    );
}

export default Cats;
