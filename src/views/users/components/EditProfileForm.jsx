import React from 'react';
import {
    Grid,
    TextField
  } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import handleChange from '../../../handleChange';
import {
    KeyboardDatePicker
  } from '@material-ui/pickers';

function EditProfileForm({userInfo, setUserInfo, errorObj, selectedDate, handleDateChange, disableUsername}){
    const findError = name => {
        if(name in errorObj.errors){
            return {
                match: true,
                message: "* " + errorObj.errors[name].join(" ")
            }
        }
        return {
            match: false,
            message: "" 
        }
    }
    return(
    <Grid container spacing={3} >
        <Grid item md={6} xs={12} >
            <TextField
                fullWidth
                label="Username"
                name="username"
                required
                onChange={event => handleChange(event, setUserInfo)}
                disabled={disableUsername}
                value={userInfo.username}
                variant="outlined"
                error={findError("username").match}
                helperText={findError("username").message}
            />
        </Grid>
        <Grid item md={6} xs={12}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={userInfo.email}
                onChange=""
                required
                onChange={event => handleChange(event, setUserInfo)}
                variant="outlined"
                error={findError("email").match}
                helperText={findError("email").message}
            />
        </Grid>
        <Grid item md={6} xs={12}>
            <TextField
                fullWidth
                label="Full name"
                name="name"
                onChange=""
                required
                onChange={event => handleChange(event, setUserInfo)}
                value={userInfo.name}
                variant="outlined"
            />
        </Grid>
        <Grid item md={6} xs={12} >
            <TextField
                fullWidth
                label="Image"
                name="image"
                onChange=""
                value={userInfo.image}
                onChange={event => handleChange(event, setUserInfo)}
                variant="outlined"
            />
        </Grid>
        <Grid item md={6} xs={12} >
            <KeyboardDatePicker
                disableToolbar
                fullWidth
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Birthday"
                value={selectedDate}
                name="Birthday"
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
        </Grid>
        <Grid item md={6} xs={12} >
            <FormControl component="div" style={{ marginTop:'25px' }}>
                <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="gender" value={userInfo.gender} onChange={event => handleChange(event, setUserInfo)}>
                    <FormControlLabel value="MALE" control={<Radio color="default" />} label="Male" />
                    <FormControlLabel value="FEMALE" control={<Radio color="default" />} label="Female" />
                </RadioGroup>
            </FormControl>
        </Grid>
    </Grid>
    );
}

export default EditProfileForm;
