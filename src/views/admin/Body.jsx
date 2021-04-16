import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CategoryIcon from '@material-ui/icons/Category';
import ForumIcon from '@material-ui/icons/Forum';
import SubjectIcon from '@material-ui/icons/Subject';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import { adminstrationStyle } from '../../styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Container
} from '@material-ui/core';
import DashboardBar from './components/DashboradBar';

export default function Body(){
  const classes = makeStyles(theme => adminstrationStyle(theme)).call(null);
  useEffect(() => {
    document.title = 'Administration | Lagrida';
  }, []);
  return(
  <div style={{marginTop: 90}}>
    <DashboardBar title="Administration Home" />
    <div className={classes.main}>
      <div my={2}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3}}>
      <Container maxWidth={true}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      CATEGORIES
                    </Typography>
                    <Typography color="textPrimary" variant="h3" >
                      3
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar className={classes.avatarStyle} style={{ background:'#5F9EA0' }}>
                      <CategoryIcon style={{ fontSize:'30px'}} />
                    </Avatar>
                  </Grid>
                </Grid>
              </CardContent>
            </Card> 
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      FORUMS
                    </Typography>
                    <Typography color="textPrimary" variant="h3" >
                      10
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar className={classes.avatarStyle} style={{ background:'#A52A2A' }} >
                      <ForumIcon style={{ fontSize:'30px'}} />
                    </Avatar>
                  </Grid>
                </Grid>
              </CardContent>
            </Card> 
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      TOPICS
                    </Typography>
                    <Typography color="textPrimary" variant="h3" >
                      50
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar className={classes.avatarStyle} style={{ background:'#E53935' }} >
                      <SubjectIcon style={{ fontSize:'30px'}} />
                    </Avatar>
                  </Grid>
                </Grid>
              </CardContent>
            </Card> 
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      COMMENTS
                    </Typography>
                    <Typography color="textPrimary" variant="h3" >
                      68
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar className={classes.avatarStyle} style={{ background:'#FB8C00' }}>
                      <ChatBubbleIcon style={{ fontSize:'30px'}} />
                    </Avatar>
                  </Grid>
                </Grid>
              </CardContent>
            </Card> 
          </Grid>
        </Grid>
      </Container>
      </Box>
      </div>
    </div>
  </div>);
}
