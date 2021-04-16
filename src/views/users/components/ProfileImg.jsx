import React, {useState, useEffect, useCallback} from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import SimpleModal from '../../components/SimpleModal';

function ProfileImg({user}){
    const [openModal, setOpenModal] = useState(() => false);
    const modalClose = () => {
        setOpenModal(false);
    }
    const OpenModale = () => {
        setOpenModal(true);
    }
    return(
        <>
        <SimpleModal open={openModal} handleClose={modalClose} title={<><h2>Profile img</h2></>}>
            <div style={{ minWidth:400, width: 500, textAlign:'center', padding: 15 }}>
                <img src={user.image} />
            </div>
        </SimpleModal>
        <Card>
            <CardContent>
            <Box
                style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
                }}>
                <Avatar src={user.image} onClick={OpenModale}
                    style={{
                        height: 100,
                        width: 100,
                        cursor: 'pointer'
                }} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                    {user.username}
                </Typography>
                <Typography color="textSecondary" variant="body1">
                    {user.roles.join("")}
                </Typography>
            </Box>
            </CardContent>
        </Card>
        </>);
}

export default ProfileImg;
