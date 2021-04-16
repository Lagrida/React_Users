import React, { useEffect, useState } from 'react';
import ShowProfile from './components/ShowProfile';
import axios from 'axios';
import URL_BACKEND from '../../backend';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';

function GetUser() {
  const { id } = useParams();
  const initHelper = {
    errorMessage: '',
    loading: true,
    fulfilled: false
  }
  const [user, setUser] = useState(() => {});
  const [helper, setHelper] = useState(() => initHelper);
  const [errorMessage, setErrorMessage] = useState(() => '');

  useEffect(() => {
    (async () => {
      await axios.get(URL_BACKEND + 'get_user/' + id)
      .then(response => {
        setUser(response.data);
        setHelper(d => ({...d, fulfilled: true, loading: false}));
      })
      .catch(error => {
        if(error.response){
          const errorMsg = error.response.data.message;
          setErrorMessage(errorMsg);
        }else{
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setHelper(d => ({...d, loading: false}));
      });
    })();
  }, []);
  return (<div style={{marginTop: 120}}>
    {helper.loading &&
      <div style={{ textAlign: "center" }}><CircularProgress size={28} color="secondary" style={{ verticalAlign: 'middle' }} /> Loading ...</div>
    }
    {errorMessage != "" &&
      <Box>
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          <AlertTitle><b>{errorMessage}</b></AlertTitle>
        </Alert>
      </Box>
    }
    {helper.fulfilled &&
      <ShowProfile user={user} isProfile={false} />
    }
  </div>);
}

export default GetUser;
