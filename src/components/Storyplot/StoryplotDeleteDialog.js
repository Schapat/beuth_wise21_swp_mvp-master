import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const StoryplotDeleteDialog = (props) => {
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  },[props])

  const handleSubmit = (e) => {
    props.onConfirm(e)
  };

  const handleClose = () => {
    props.onCancel()
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Story</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this story?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="contained">
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)} color="secondary" autoFocus variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StoryplotDeleteDialog;