import React, { useEffect, useState } from 'react';
import axios from 'axios';
import URL_BACKEND from '../backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';

import {
    Card,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ButtonBase from '@material-ui/core/ButtonBase';

function UsersList(){
    const initHelper = {
        errorMessage: '',
        loading: true,
        fulfilled: false
    }
    const [users, setUsers] = useState(() => []);
    const [helper, setHelper] = useState(() => initHelper);
    const [errorMessage, setErrorMessage] = useState(() => '');
    const [selectedPage, setSelectedPage] = useState(() => 1);

    const loadData = async page => {
        setHelper(d => ({...d, loading: true}));
        await axios.get(URL_BACKEND + 'get_users?page=' + page)
        .then(response => {
            setUsers(response.data);
            setHelper(d => ({...d, loading: false, fulfilled: true}));
        })
        .catch(error => {
            if(error.response){
                setErrorMessage(error.response?.data?.message);
            }else{
                setErrorMessage(error?.message);
            }
        })
        .finally(() => {
            setHelper(d => ({...d, loading: false}));
        });
    }
    useEffect(() => {
        document.title = 'Users list | Lagrida';
        loadData(selectedPage);
    }, []);
    const handleSelectedPage = (event, value) => {
        setSelectedPage(d => value);
        loadData(value);
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
    return(
    <div style={{marginTop: 120}}>
    {errorMessage != "" &&
      <Box>
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          <AlertTitle><b>{errorMessage}</b></AlertTitle>
        </Alert>
      </Box>
    }
    <Grid container justify="center" alignItems="center">
        <Grid item lg={10} md={11} sm={11} xs={11}>
        <Card style={{ marginTop: '10px' }}>
            <PerfectScrollbar>
                <Box style={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>#</b></TableCell>
                                <TableCell><b>Img</b></TableCell>
                                <TableCell><b>Username</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Full name</b></TableCell>
                                <TableCell><b>Roles</b></TableCell>
                                <TableCell><b>Registration date</b></TableCell>
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
                                        <div style={{ verticalAlign:'middle', display:'inline-block', float:'left' }}>
                                            <Link to={`/get_user/${user.id}`}><Avatar alt={user.username} src={user.image}></Avatar></Link>
                                        </div>&nbsp;
                                    </TableCell>
                                    <TableCell>
                                    <Link to={`/get_user/${user.id}`}>
                                            {user.username}
                                    </Link>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user?.roles[0]?.name}</TableCell>
                                    <TableCell>{formatDate(user.created_at)}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            {helper.fulfilled &&
                <div style={{ padding: '15px', textAlign:'center', marginLeft:'auto', marginRight:'auto' }}>
                    <Pagination defaultPage={selectedPage} style={{textAlign:'center', display: 'inline-block'}} count={Math.floor(users.total/users.per_page)} variant="outlined" shape="rounded" color="primary" onChange={handleSelectedPage} />
                </div>
            }
        </Card>
        </Grid>
    </Grid>
    </div>);
}

export default UsersList;
