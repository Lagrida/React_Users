import React, {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { adminstrationStyle } from '../../styles';
import DashboardBar from './components/DashboradBar';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import {Link} from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab';
import axios from 'axios';
import {URL_ADMIN_BACKEND} from '../../backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SimpleModal from '../components/SimpleModal';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import {
    Button,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
  } from '@material-ui/core';
  import SearchIcon from '@material-ui/icons/Search';
  import PerfectScrollbar from 'react-perfect-scrollbar';
import EditProfileForm from '../users/components/EditProfileForm';
import handleChange from '../../handleChange';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';

  const useStyles = makeStyles(theme => ({
    root: {
      width: 250,
      margin: 10
    },
    media: {
      height: 100
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
  }));
function Users(){
    const classes2 = useStyles();
    const errorInit = {
        message:"",
        errors: {
        }
    }
    const [openModal, setOpenModal] = useState(() => false);
    const [selectedPage, setSelectedPage] = useState(() => 1);
    const [users, setUsers] = useState(() => []);
    const [userInfo, setUserInfo] = useState(() => {});
    const [errorObj, setErrorObj] = useState(() => errorInit);
    const [selectedDate, setSelectedDate] = useState(() => new Date());
    const [selectedUsername, setSelectedUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleDateChange = date => {
        setSelectedDate(date);
    }

    const [helper, setHelper] = useState(() => ({
        isError: false,
        error: {},
        loading: false,
        fulfilled: false
    }));
    const [helper2, setHelper2] = useState(() => ({isUpdated: false, loading: false}));
    const handleSelectedPage = (event, value) => {
        setSelectedPage(d => value);
        loadData(value);
    }
    const loadData = async page => {
        setHelper(d => ({...d, loading: true}));
        await axios.get(URL_ADMIN_BACKEND + 'get_users?page=' + page)
        .then(response => {
            setUsers(response.data);
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
    const classes = makeStyles(theme => adminstrationStyle(theme)).call(null);
    useEffect(() => {
        loadData(selectedPage);
    }, []);
    const modalClose = () => {
        setErrorObj(errorInit);
        setOpenModal(false);
    }
    const parseISOString = s => {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    const formatDate = d => {
        if(d == null){
            return '';
        }
        d = parseISOString(d);
        const pad = n => {
            return (n<10? '0' :  '') + n
        }
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + ' ' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
    }
    const OpenModale = user => {
        let theUser = user;
        theUser.role = user?.roles[0]?.name;
        setErrorObj(errorInit);
        setOpenModal(true);
        setUserInfo(theUser);
        setSelectedDate(new Date(user.birthday));
        setSelectedUsername(user.username);
    }
    const modifyUser = event => {
        event.preventDefault();
        setErrorObj(errorInit);
        setHelper2(d => ({
            ...d,
            loading: true
        }));

        axios.patch(URL_ADMIN_BACKEND + 'update_user/' + userInfo.id, userInfo)
        .then(response => {
            setErrorObj(errorInit);
            setHelper2(d => ({...d, isUpdated: true}));
            modalClose();
            loadData(selectedPage);
        })
        .catch(error => {
            let message;
            if(error.response){
                let theErrorObj = errorInit;
                let errorData = error.response.data;
                theErrorObj.message = errorData?.message || "Error";
                if(errorData.errors){
                    theErrorObj.errors = errorData.errors;
                }
                setErrorObj(theErrorObj);
            }else{
                message = error.message;
                setErrorObj({message});
            }
        })
        .finally(() => {
            setHelper2(d => ({
                ...d,
                loading: false
            }));
            if(helper2.isUpdated){
                setErrorObj(errorInit);
            }
        });
    }
    const deleteUser = async id => {
        setOpen2(true);
        await axios.delete(URL_ADMIN_BACKEND + 'delete_user/' + id)
            .then(response => {
                setOpen(true);
                (async () => {
                    await loadData(selectedPage);
                })();
                setSnackbarMessage('User is removed');
            })
            .catch(error => {
                let errorData;
                if(error.response){
                    errorData = error.response.data?.message;
                }else{
                    errorData = error.message;
                }
                setSnackbarMessage('Error : ' + errorData);
                setOpen(true);
            })
            .finally(() => {
                setOpen2(false);
            });
    }
    const clickDeleteUser = id => {
        const msg = "Are you sure to delete this user ?";
        if(window.confirm(msg)){
            (async () => {
                await deleteUser(id);
            })();
        }
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }
    return(
        <div style={{marginTop: 90}}>
            <Backdrop className={classes2.backdrop} open={open2}>
                <CircularProgress color="inherit" />
            </Backdrop>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={800}
                    onClose={handleClose}
                    message={snackbarMessage}
                    action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                    }
                />
          <DashboardBar title="Administration Users" />
          <SimpleModal open={openModal} handleClose={modalClose} title={<><h2>Modify user : {selectedUsername}</h2></>}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div style={{ minWidth:400, width: 500 }}>
                        {errorObj.message != "" && 
                        <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                            <AlertTitle><b>{errorObj.message}</b></AlertTitle>
                        </Alert>}
                        <form onSubmit={modifyUser}>
                        <EditProfileForm disableUsername={false} userInfo={userInfo} setUserInfo={setUserInfo} errorObj={errorObj} selectedDate={selectedDate} handleDateChange={handleDateChange} />
                        <Grid container spacing={3} >
                            <Grid item md={6} xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel>Role</InputLabel>
                                    <Select
                                        value={userInfo?.role}
                                        name="role"
                                        onChange={event => handleChange(event, setUserInfo)}
                                    >
                                        <MenuItem value="admin">admin</MenuItem>
                                        <MenuItem value="monitor">monitor</MenuItem>
                                        <MenuItem value="user">user</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                                <Box my={2}>
                                    <Button
                                        disabled={helper2.loading}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary">
                                        Update user
                                    </Button>
                                    {helper2.loading && <div style={{ textAlign:"center", marginTop:'20px' }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                                </Box>
                        </form>
                    </div>
            </MuiPickersUtilsProvider>
            </SimpleModal>
          <div className={classes.main}>
          <Box>
          {helper.isError && 
            <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                <AlertTitle><b>{helper.error.message}</b></AlertTitle>
            </Alert>}
            <Box style={{ mt: 3 }}>
            <Card>
                <CardContent>
                <Grid container className={classes.root} spacing={2}>
                <Grid item xs={6}>
                    <Box style={{ maxWidth: 500 }}>
                        <TextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <SvgIcon
                                fontSize="small"
                                color="action"
                                >
                                <SearchIcon />
                                </SvgIcon>
                            </InputAdornment>
                            )
                        }}
                        placeholder="Search user"
                        variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
                        <Grid item>
                            <Typography color="textSecondary" gutterBottom variant="h6">
                            USERS
                            </Typography>
                            <Typography color="textPrimary" variant="h3" >
                            {helper.fulfilled ? users.total : 0}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar className={classes.avatarStyle} color="secondary"  >
                            <PeopleAltIcon style={{ fontSize:'30px'}} />
                            </Avatar>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                </CardContent>
            </Card>
            </Box>
        </Box>
        <Card style={{ marginTop: '10px' }}>
            <PerfectScrollbar>
                <Box style={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Username</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Full name</b></TableCell>
                                <TableCell><b>Roles</b></TableCell>
                                <TableCell><b>Registration date</b></TableCell>
                                <TableCell><b>Operations</b></TableCell>
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
                            users.data.map((user, index) => 
                                <TableRow hover key={index}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <Link to={`/get_user/${user.id}`}>
                                            <div style={{ verticalAlign:'middle', display:'inline-block' }}>
                                                <Avatar alt={user.username} src={user.image}></Avatar>
                                            </div>&nbsp;
                                            {user.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user?.roles[0]?.name}</TableCell>
                                    <TableCell>{formatDate(user.created_at)}</TableCell>
                                    <TableCell>
                                    <Tooltip title="Edit" placement="top">
                                        <Fab onClick={() => OpenModale(user)} color="primary" size="small" aria-label="edit" style={{color:"#ffffff", marginRight: "10px"}}>
                                            <EditOutlinedIcon />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top" onClick={() => clickDeleteUser(user.id)}>
                                        <Fab size="small" aria-label="edit" style={{background: "#e33371", color:"#ffffff", marginRight: "10px"}}>
                                            <DeleteIcon />
                                        </Fab>
                                    </Tooltip>
                                </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            {helper.fulfilled &&
                <div style={{ padding: '15px', textAlign:'center', marginLeft:'auto', marginRight:'auto' }}>
                    Page : {selectedPage} <br />
                    <Pagination defaultPage={selectedPage} style={{textAlign:'center', display: 'inline-block'}} count={Math.floor(users.total/users.per_page)} variant="outlined" shape="rounded" color="primary" onChange={handleSelectedPage} />
                </div>
            }
        </Card>
        </div>
        </div>
    );
}

export default Users;
