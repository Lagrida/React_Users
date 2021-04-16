import React from 'react';
import { Button } from "@material-ui/core";
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function SimpleModal(props){
    return(
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          scroll="paper">
            <DialogTitle >
              {props.title}
            </DialogTitle>
            <PerfectScrollbar>
              <DialogContent dividers={true}>
                  {props.children}
              </DialogContent>
            </PerfectScrollbar>
            <DialogActions>
              <Button onClick={props.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
        </Dialog>
    );
}
export default SimpleModal;
