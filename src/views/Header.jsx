import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router';
import { HeaderStyle } from '../styles';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AuthenticationService from '../AuthenticationService';

function Header(props){
    const classes = makeStyles((theme) => HeaderStyle(theme)).call(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [anchor, setAnchor] = useState(() => false);

    const displayAdmin = (AuthenticationService.isConnected() && AuthenticationService.getRoles().includes("admin"));
    const linksList = [
        {
            title: 'Administration',
            icon: <SupervisorAccountIcon style={{ verticalAlign: "text-bottom" }} />,
            linkTo: `admin`,
            display: displayAdmin
        },
        {
            title: 'Users',
            icon: <SupervisorAccountIcon style={{ verticalAlign: "text-bottom" }} />,
            linkTo: `users`,
            display: true
        }
    ];
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenu2 = event => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const toggleDrawer = () => {
        setAnchor(d => !d);
    }
    return(
        <div className={classes.root}>
          <SwipeableDrawer
            anchor='left'
            open={anchor}
            onClose={toggleDrawer}
            onOpen={() => true}>
            <div className={classes.anchorList}>
                <List>
                {linksList.map((el, index) => 
                    el.display && <span key={index}>
                        <ListItem button component={Link} to={`/${el.linkTo}`} onClick={toggleDrawer}>
                            <ListItemIcon>{el.icon}</ListItemIcon>
                            <ListItemText primary={el.title} />
                        </ListItem>
                </span>)}
                </List>
            </div>
          </SwipeableDrawer>
            <AppBar position='fixed' color='primary'>
                <Toolbar>
                    <IconButton edge="start" className={classes.showInSmallScreens} onClick={toggleDrawer} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant='h4' color='inherit'>
                        <Link to={`/`} style={{ color:"#FFF", textDecoration:"none" }}>Forum</Link>
                    </Typography>
                    <Typography color='inherit' className={classes.hideInSmallScreens}>
                        {linksList.map((el, index) => 
                            el.display && <span key={index}>
                                <Link to={`/${el.linkTo}`} style={{ color:"#FFF", textDecoration:"none" }}>
                                    {el.icon} 
                                    {el.title}
                                </Link> &nbsp;
                            </span>
                        )}
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder='Search...'
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                            }}
                        />
                    </div>
                    <div style={{ margin: "4px", padding: "10px" }} className={classes.hideInSmallScreens}> 
                        {!AuthenticationService.isConnected() && <Link to={`/register`}><Button variant="outlined" style={{ color:'#fff', fontWeight:'bold' }}>Register</Button></Link>} &nbsp; 
                        {!AuthenticationService.isConnected() && <Link to={`/login`}><Button variant="contained">Login</Button></Link>}
                    </div>
                    {AuthenticationService.isConnected() && 
                    <>
                        <Avatar onClick={handleMenu2} alt={AuthenticationService.getUser().username} src={AuthenticationService.getUser().image} style={{ display:'inline-block', verticalAlign:'middle', cursor:'pointer', background:'#fff' }}>
                            <img style={{ width:'100%', height:'100%' }} src={process.env.PUBLIC_URL + "/fail_img.png"} />
                        </Avatar>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl2}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open2}
                        onClose={handleClose2}
                    >
                        <MenuItem component={Link} to={`/profile`} onClick={handleClose2} style={{ textDecoration:'none' }}>profile</MenuItem>
                        <MenuItem component={Link} to={`/logout`} onClick={handleClose2} style={{ textDecoration:'none', color:'#CC0000' }}>logout</MenuItem>
                    </Menu>
                    </>
                    }
                    {!AuthenticationService.isConnected() &&
                    <div className={classes.showInSmallScreens}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit">
                    <MoreIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to={`/register`} style={{ textDecoration:'none' }} onClick={handleClose}>Register</MenuItem>
                        <MenuItem component={Link} to={`/login`} style={{ textDecoration:'none' }} onClick={handleClose}>Login</MenuItem>
                    </Menu>
                    </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default withRouter(Header);
