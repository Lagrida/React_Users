import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Container,
    Typography
  } from '@material-ui/core';

import ProfileImg from './ProfileImg';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router';

function ShowProfile({user, isProfile}){
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
        <div style={{marginTop: 90}}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileImg user={user} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
                <Box style={{ padding: 5, paddingLeft: 15 }}>
                  {!isProfile &&
                    <h2>{user.username}</h2>
                  }
                  {isProfile && <>
                  <Box style={{ float:'left', paddingTop:8 }}>
                    <h2>My Profile</h2>
                  </Box>
                  <Box style={{ float:'right' }}>
                  <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        component={Link}
                        to={`/profile/edit`}
                        color="inherit">
                    <EditIcon />
                    </IconButton>
                  </Box></>
                  }
                </Box>
                <Box style={{clear:'both'}}></Box>
                <Divider />
                <CardContent>
                <Grid container spacing={3} >
                    <Grid item md={6} xs={12} >
                      <Typography color="textSecondary" gutterBottom variant="h6">
                        EMAIL
                      </Typography>
                      <Typography color="textPrimary" variant="h5" >
                        {user.email}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Typography color="textSecondary" gutterBottom variant="h6">
                        GENDER
                      </Typography>
                      <Typography color="textPrimary" variant="h5" >
                      {user.gender}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Typography color="textSecondary" gutterBottom variant="h6">
                          BIRTHDAY
                        </Typography>
                        <Typography color="textPrimary" variant="h5" >
                        {user.birthday}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} >
                      <Typography color="textSecondary" gutterBottom variant="h6">
                          REGISTRED AT
                        </Typography>
                        <Typography color="textPrimary" variant="h5" >
                        {formatDate(user.created_at)}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} >
                      <Typography color="textSecondary" gutterBottom variant="h6">
                          FULL NAME
                        </Typography>
                        <Typography color="textPrimary" variant="h5" >
                        {user.name}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} >
                    
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
        </div>
    );
}

export default withRouter(ShowProfile);
