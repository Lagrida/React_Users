import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import CategoryIcon from '@material-ui/icons/Category';
import ForumIcon from '@material-ui/icons/Forum';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { breakPoints } from '../../../styles';
import { adminstrationStyle } from '../../../styles';

const linksList = [
  {
      title: 'Home',
      icon: <HomeIcon />,
      linkTo: 'admin',
      display: true
  },
  {
      title: 'Users',
      icon: <PeopleIcon />,
      linkTo: 'admin/users',
      display: true
  },
  {
      title: 'Categories',
      icon: <CategoryIcon />,
      linkTo: 'admin/cats',
      display: false
  },
  {
      title: 'Forums',
      icon: <ForumIcon />,
      linkTo: 'admin/forums',
      display: false
  }
];
function DashboardBar(props) {
  const classes = makeStyles(theme => adminstrationStyle(theme)).call(null);
  const classes2 = makeStyles(theme => breakPoints(theme)).call(null);
  const [anchor, setAnchor] = useState(() => false);
  const toggleDrawer = () => {
    setAnchor(d => !d);
  }
  return (<>
          <SwipeableDrawer
            anchor='left'
            open={anchor}
            onClose={toggleDrawer}
            onOpen={() => true}>
            <div className={classes.anchorList}>
                <List>
                {linksList.map((el, index) => 
                    el.display && <span key={index}>
                        <ListItem button component={Link} to={`/${el.linkTo}`}>
                            <ListItemIcon>{el.icon}</ListItemIcon>
                            <ListItemText primary={el.title} />
                        </ListItem>
                </span>)}
                </List>
            </div>
          </SwipeableDrawer>
          <div className={`${classes.sidenav} ${classes2.hideInSmallScreens}`}>
          <h2><SupervisorAccountIcon style={{ verticalAlign: 'middle' }} /> Administration</h2>
          <Divider />
          <List>
          {linksList.map((el, index) => 
            el.display && <span key={index}>
              <ListItem button component={Link} to={`/${el.linkTo}`}>
                <ListItemIcon>{el.icon}</ListItemIcon>
                <ListItemText primary={el.title} />
              </ListItem>
            </span>)}
          </List>
        </div>
        <div className={classes.main}>
        <Paper className={classes.adminTitle} style={{ marginBottom: '15px' }}>
        <IconButton edge="start" className={classes2.showInSmallScreens} onClick={toggleDrawer} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        {props.title}
      </Paper>
    </div>
  </>);
}

export default DashboardBar;
