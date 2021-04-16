import React, {useState, useEffect} from 'react';
import { FormStyle } from '../../styles';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {Alert, AlertTitle} from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import handleChange from '../../handleChange';
import axios from 'axios';
import URL_BACKEND from '../../backend';
import AuthenticationService from '../../AuthenticationService'

const loginInit = {
    username: '',
    password: ''
  }
const errorInit = {
    isError: false,
    loading: false,
    isLogged: false,
    error:{}
};
function Login(){
    useEffect(() => { // onmount
        document.title = "Login";
    }, []);
    const [userInfo, setUserInfo] = useState(() => loginInit);
    const [helper, setHelper] = useState(() => errorInit);
    const classes = makeStyles((theme) => FormStyle(theme)).call(null);
    const handleSubmit = async event => {
        event.preventDefault();
        setHelper(d => ({ ...d, loading:true }));
        await axios.post(URL_BACKEND + 'login', userInfo)
        .then(response => {
            const data = response.data;
            AuthenticationService.JwtAuthentication(data);
            setHelper(d => ({ ...d, isError: false, isLogged:true }));
        })
        .catch(error =>{
            if(error.response){
                setHelper(d => ({...d, isError: true, error: error.response.data}));
            }else{
                setHelper(d => ({...d, isError: true, error: {message: error.message}}));
            }
        })
        .finally(() => {
            setHelper(d => ({ ...d, loading:false }));
        });
    };
    return(
        <Container component="main" maxWidth="xs" className={classes.cont} style={{marginTop: 90}}>
            <CssBaseline />
            {helper.isLogged && <Redirect to={`/`} />}
            {helper.isError && 
            <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                <AlertTitle><b>{helper.error.message}</b></AlertTitle>
            </Alert>
            }
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon style={{ fontSize:'40px'}} />
                </Avatar>
                <Typography component="h2" variant="h2">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={ event => handleChange(event, setUserInfo) }
                    autoComplete="username"
                    value={userInfo.username}
                    />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    onChange={ event => handleChange(event, setUserInfo) }
                    label="Password"
                    type="password"
                    id="password"
                    value={userInfo.password}
                    autoComplete="current-password"
                    />
                    <Button
                    disabled={helper.loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Sign In
                    </Button><br />
                    {helper.loading && <div style={{ textAlign:"center" }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Login ...</div>}
                </form>
            </Paper>
        </Container>
    );
}

export default Login;
