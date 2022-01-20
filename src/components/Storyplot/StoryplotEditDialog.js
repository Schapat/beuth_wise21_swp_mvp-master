import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const StoryplotEditDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [storyplotName, setstoryplotName] = React.useState(props.storyplotName != null ? props.storyplotName : null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Storyplot</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name for your Storyplot. The name helps you to easily identify your story. The name can be changed at any time. 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Storyplot Name"
            type="name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}