import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SubHeader from './components/SubHeader';
import { makeStyles } from '@material-ui/core/styles';
import AuthenticationService from '../AuthenticationService';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

function Body(){
    const classes = useStyles();
    const user = AuthenticationService.isConnected() ? AuthenticationService.getUser() : {username: 'visitor'};
    useEffect(() => {
        document.title = 'Forum | Lagrida';
      }, []);
    return(
        <Container fixed style={{ marginTop: 90 }}>
            <h2>Hello <i>{user.username}</i></h2><br />
            Example of accounts:
            <Box display="flex" flexWrap="wrap" justifyContent="center">
                <Card style={{ width: 200, margin: 10 }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        USERNAME:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Lagrida
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        PASSWORD:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        123456
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        ROLE:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Admin
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ width: 200, margin: 10 }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        USERNAME:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Euler
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        PASSWORD:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        123456
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        ROLE:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Monitor
                        </Typography>
                    </CardContent>
                </Card>
                <Card style={{ width: 200, margin: 10 }}>
                    <CardContent>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        USERNAME:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        Gauss
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        PASSWORD:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        123456
                        </Typography>
                        <Typography variant="h6" component="h2" color="textSecondary" >
                        ROLE:
                        </Typography>
                        <Typography variant="h4" component="h1" gutterBottom>
                        User
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            {AuthenticationService.isConnected() &&
                <h2>You have roles : {AuthenticationService.getRoles().join(",")}</h2>
            }
            Pages Accessible with roles :
            <div className={classes.root}>
                <Link to={`/page1`}><Button variant="contained">user, monitor, admin</Button></Link>
                <Link to={`/page2`}><Button variant="contained">monitor, admin</Button></Link>
                <Link to={`/page3`}><Button variant="contained">admin</Button></Link>
            </div>
        </Container>
    );
}
export default Body;
