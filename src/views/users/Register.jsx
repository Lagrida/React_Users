import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Alert, AlertTitle} from '@material-ui/lab';
import handleChange from '../../handleChange';
import axios from 'axios';
import URL_BACKEND from '../../backend';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    link: {
      display: 'flex',
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
    paper:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "25px"
    },
    avatar:{
        textAlign: 'center',
        background:'#008B8B',
        width: theme.spacing(7),
        height: theme.spacing(7),
    }
}));

function Register(){
    const register = {
        username: '',
        password: '',
        image: '',
        email: '',
        name: '',
        birthday:'04/04/1993',
        gender: 'MALE'
    };
    const errorInit = {
        message:"",
        errors: {
        }
    }
    const repeatPassError = {
        repeatedPassword: '',
        isError: false
    }
    const [userInfo, setUserInfo] = useState(() => register);
    const [selectedDate, setSelectedDate] = useState(() => new Date('1993-04-04T00:00:00'));
    const [repeatPassword, setRepeatPassword] = useState(() => repeatPassError);
    const [errorObj, setErrorObj] = useState(() => errorInit);
    const [helper, setHelper] = useState(() => ({isRegistred: false, loading: false}));
    useEffect(() => {
        document.title = "Register | Lagrida";
    }, []);
    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const handleSubmit = event => {
        event.preventDefault();
        setHelper(d => ({
            ...d,
            loading: true
        }));
        const year = selectedDate.getUTCFullYear();
        const month = selectedDate.getUTCMonth()+1;
        const day = selectedDate.getUTCDate();
        const birthday = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day} 00:00:00`
        setErrorObj(d => errorInit);
        setRepeatPassword(d => ({
            ...d,
            isError: false
        }));
        if(repeatPassword.repeatedPassword != userInfo.password){
            setRepeatPassword(d => ({
                ...d,
                isError: true
            }));
        }
        const userInfo2 = {...userInfo, birthday};
        axios.post(URL_BACKEND + 'register', userInfo2)
        .then(response => {
            setHelper(d => ({
                ...d,
                isRegistred: true
            }));
        })
        .catch(error =>{
            if(error.response){
                let theErrorObj = errorInit;
                let errorData = error.response.data;
                theErrorObj.message = errorData?.message || "Error";
                if(errorData.errors){
                    theErrorObj.errors = errorData.errors;
                }
                setErrorObj(d => theErrorObj);
            }else{
                setErrorObj(d => ({...d, message: error.message}));
            }

        })
        .finally(() => {
            setHelper(d => ({
                ...d,
                loading: false
            }));
            if(helper.isRegistred){
                setErrorObj(errorInit);
            }
        });
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
    const classes = useStyles();
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container component="main" maxWidth="md" style={{marginTop: 90}}>
                <Grid container spacing={3} justify="center" alignItems="center">
                    <Grid item xs={12} sm={10} md={9}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <CreateIcon style={{ fontSize:'40px'}} />
                            </Avatar>
                            <Typography component="h3" variant="h2" align="center">
                                Register new User
                            </Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    {helper.isRegistred && 
                                        <Box my={2}>
                                            <Alert severity="success" style={{ fontSize: '18px' }}>
                                            <AlertTitle>Success</AlertTitle>
                                                You are registred successfuly!<br />
                                                Your username : <b>{userInfo.username}</b><br />
                                                Your password : <b>{userInfo.password}</b>
                                            </Alert>
                                        </Box>
                                    }
                                    {(errorObj.message != "" && !helper.isRegistred) && 
                                        <Box>
                                            <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                                                <AlertTitle><b>{errorObj.message}</b></AlertTitle>
                                            </Alert>
                                        </Box>
                                    }
                                </Grid>
                            </Grid>
                            {!helper.isRegistred &&
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box>
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                margin="normal"
                                                fullWidth
                                                label="username"
                                                variant="outlined"
                                                name="username"
                                                value={userInfo.username}
                                                onChange={event => handleChange(event, setUserInfo)}
                                                error={findError("username").match}
                                                helperText={findError("username").message}
                                                />
                                                <Grid container spacing={1} justify="center" alignItems="center">
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <TextField
                                                            label="Password"
                                                            fullWidth
                                                            variant="outlined"
                                                            type="password"
                                                            name="password"
                                                            value={userInfo.password}
                                                            onChange={event => handleChange(event, setUserInfo)}
                                                            error={findError("password").match}
                                                            helperText={findError("password").message}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={6}>
                                                        <TextField
                                                            label="Repeat Password"
                                                            fullWidth
                                                            variant="outlined"
                                                            type="password"
                                                            name="repeatedPassword"
                                                            value={repeatPassword.repeatedPassword}
                                                            onChange={event => setRepeatPassword(previous => ({...previous, repeatedPassword: event.target.value}))}
                                                            error={repeatPassword.isError}
                                                            helperText={findError("repeatedPassword").message}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    label="email"
                                                    variant="outlined"
                                                    name="email"
                                                    value={userInfo.email}
                                                    onChange={event => handleChange(event, setUserInfo)}
                                                    error={findError("email").match}
                                                    helperText={findError("email").message}
                                                />
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    label="Full name"
                                                    variant="outlined"
                                                    name="name"
                                                    value={userInfo.name}
                                                    onChange={event => handleChange(event, setUserInfo)}
                                                />
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    label="image"
                                                    variant="outlined"
                                                    name="image"
                                                    value={userInfo.image}
                                                    onChange={event => handleChange(event, setUserInfo)}
                                                />
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    variant="inline"
                                                    format="dd/MM/yyyy"
                                                    margin="normal"
                                                    label="Birthday"
                                                    value={selectedDate}
                                                    name="birthday"
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <FormControl component="div" style={{ marginTop:'25px' }}>
                                                    <FormLabel component="legend">Gender</FormLabel>
                                                    <RadioGroup row aria-label="gender" name="gender" value={userInfo.gender} onChange={event => handleChange(event, setUserInfo)}>
                                                        <FormControlLabel value="MALE" control={<Radio color="default" />} label="Male" />
                                                        <FormControlLabel value="FEMALE" control={<Radio color="default" />} label="Female" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <Grid container spacing={3} justify="center" alignItems="center">
                                                    <Grid item xs={6}>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Button disabled={helper.loading} variant="contained" type="submit" color="secondary" fullWidth>
                                                        Register
                                                        </Button>
                                                        {helper.loading && <div style={{ textAlign:"center", marginTop:'20px' }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Box>
                                    </Grid>
                                </Grid>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    );
}

export default Register;
