import React,{useState, useEffect} from 'react';
import DashboardBar from './components/DashboradBar';
import { adminstrationStyle } from '../../styles';
import {
    Button,
    Box
  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function Forums(){
    const classes = makeStyles(theme => adminstrationStyle(theme)).call(null);
    const [openModal, setOpenModal] = useState(() => false);
    return(
        <div style={{marginTop: 90}}>
            <DashboardBar title="Administration Forums" />
            <Box>
                <div className={classes.main}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                    <Button
                        color="primary"
                        onClick={() => setOpenModal(true)}
                        variant="contained">
                        Add Forum
                    </Button>
                </div>
            </Box>
        </div>
    );
}

export default Forums;
