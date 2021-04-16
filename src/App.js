import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routers from './router';
import Header from './views/Header'
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import AuthenticationService from './AuthenticationService';

import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  //useEffect(() => {
    //axios.defaults.headers.common['Authorization'] = (AuthenticationService.getToken() != '' ? 'Bearer ' : '') + AuthenticationService.getToken();
    AuthenticationService.AddBearerHeader();
  //}, []);
  return (
    <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />
          <Header />
          <Routers />
        </Router>
    </ThemeProvider>
  );
}

export default App;
