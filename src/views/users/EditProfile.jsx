import React, {useState, useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import URL_BACKEND from '../../backend';
import {Alert, AlertTitle} from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Redirect} from 'react-router-dom';
import AuthenticationService from '../../AuthenticationService';
import { withRouter } from 'react-router';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Container
  } from '@material-ui/core';
import ProfileImg from './components/ProfileImg';
import {
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import EditProfileForm from './components/EditProfileForm';


const errorInit = {
    message:"",
    errors: {
    }
}
function EditProfile(){
    let user = AuthenticationService.getUser();
    const isConnected = AuthenticationService.isConnected();
    const [userInfo, setUserInfo] = useState(() => user);
    
    const [helper, setHelper] = useState(() => ({isUpdated: false, loading: false}));
    const [errorObj, setErrorObj] = useState(() => errorInit);

    const [selectedDate, setSelectedDate] = useState(() => new Date(user.birthday));

    const handleDateChange = date => {
        setSelectedDate(date);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth()+1;
        const day = date.getUTCDate();
        const birthday = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day} 00:00:00`;
        setUserInfo(d => ({
            ...d,
            birthday
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        setErrorObj(errorInit);
        setHelper(d => ({
            ...d,
            loading: true
        }));

        axios.patch(URL_BACKEND + 'update_profile/' + user.id, userInfo)
        .then(reponse => {
            AuthenticationService.refreshToken(reponse.data);
            setErrorObj(errorInit);
            setHelper(d => ({...d, isUpdated: true}));
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
            setHelper(d => ({
                ...d,
                loading: false
            }));
            if(helper.isUpdated){
                setErrorObj(errorInit);
            }
        });
    }
    useEffect(() => {
        document.title = 'Edit profile | Lagrida';
      }, []);
    return(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <div style={{marginTop: 90}}>
      <Container maxWidth="lg">
      {isConnected &&
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileImg user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader subheader="The information can be edited" title="Edit your profile" />
                {(errorObj.message != "" && !helper.isUpdated) && 
                    <Box>
                        <Alert severity="error" style={{marginTop: "4px", marginBottom: "10px"}}>
                            <AlertTitle><b>{errorObj.message}</b></AlertTitle>
                        </Alert>
                    </Box>
                }
                {helper.isUpdated && <Redirect to={`/profile`} />}
                <Divider />
                <CardContent>
                    <EditProfileForm disableUsername={true} userInfo={userInfo} setUserInfo={setUserInfo} errorObj={errorObj} selectedDate={selectedDate} handleDateChange={handleDateChange} />
                </CardContent>
                <Divider />
                <Box
                style={{
                    float: 'right',
                    padding: 10
                }}
                >
                <Button color="primary" variant="contained" type="submit" disabled={helper.loading}>
                    Save details
                </Button>
                {helper.loading && <div style={{ textAlign:"center", marginTop:'20px' }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>}
                </Box>
                <div style={{ clear:'both' }}></div>
            </Card>
            </form>
          </Grid>
        </Grid>
      }
      </Container>
    </div>
    </MuiPickersUtilsProvider>);
}

export default withRouter(EditProfile);
