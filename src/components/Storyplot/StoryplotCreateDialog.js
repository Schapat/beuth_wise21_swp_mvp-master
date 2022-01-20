import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  gameSelect: {
    margin: '50px 0px 10px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const StoryplotCreateDialog = (props) => {
  const classes = useStyles();
  const [storyTitle, setStoryTitle] = React.useState('');
  const [title, setTitle] = React.useState(props.title);
  const [text, setText] = React.useState(props.text);
  const [open, setOpen] = React.useState(props.open);
  const [game, setGame] = React.useState('');
  const [storyName, setStoryName] = React.useState(props.storyName);

  useEffect(() => {
    setOpen(props.open);
    setStoryName(props.storyName);
  },[props])


  const handleTextInput = (e) => {
    setStoryTitle(e.target.value);
  }

  const handleGameChange = (e) => {
    setGame(e.target.value);
  }

  const handleSubmit = () => {
    props.onConfirm(storyTitle);
  }

  const handleCancel = () => {
    props.onCancel()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {text} 
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Story Name"
          defaultValue={storyName}
          type="text"
          fullWidth
          onChange={handleTextInput}
        />

        <DialogContentText className={classes.gameSelect}>
          Select a gamesystem (optional). 
        </DialogContentText>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Gamesystem</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={game}
            onChange={handleGameChange}
            fullWidth
          >
            <MenuItem value={'Dungeons & Dragons'}>Dungeons & Dragons</MenuItem>
            <MenuItem value={'Call of Cthulhu'}>Call of Cthulhu</MenuItem>
            <MenuItem value={'Blades in the Dark'}>Blades in the Dark</MenuItem>
            <MenuItem value={'Other'}>Other</MenuItem>
          </Select>
      </FormControl>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="default"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoryplotCreateDialog;