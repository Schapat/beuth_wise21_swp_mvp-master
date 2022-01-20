import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';



const StoryCardEditMask = (props) => {
  const [open, setOpen] = React.useState(props.open);
  const [cardTitle, setCardTitle] = React.useState(props.cardTitle);
  const [cardDescription, setCardDescription] = React.useState(props.cardDescription);
  const [cardSubtitle, setCardSubtitle] = React.useState(props.cardSubtitle);
  const [cardStory, setCardStory] = React.useState(props.cardStory);

  useEffect(() => {
    setOpen(props.open);
    setCardTitle(props.cardTitle);
    setCardSubtitle(props.cardSubtitle);
    setCardDescription(props.cardDescription);
    setCardStory(props.cardStory);
  },[props])

  const handleSubmit = () => {
    let update = {
      cardTitle: cardTitle,
      cardSubtitle: cardSubtitle,
      cardDescription: cardDescription,
      cardStory: cardStory
    }
    props.onConfirm(update)
  };

  const handleClose = () => {
    props.onCancel()
  };

  const handleChange = (e) => {
    try {
      let val = e.target.value; 
      let tar = e.target.id;

      switch(tar) {
        case 'cardTitle':
          setCardTitle(val);
          break;
        case 'cardSubtitle':
          setCardSubtitle(val);
          break;
        case 'cardDescription':
          setCardDescription(val);
          break;
        case 'cardStory':
          setCardStory(val);
          break;
        default:
      }
    }
    catch (err) { }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={() => {return ;}}
      >
        <DialogTitle id="alert-dialog-title" variant="h6">Edit Story Event</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} component={'span'}><Divider></Divider></Grid>
              <Grid item xs={12} sm={12}>
                <Typography component={'span'} variant={'body2'}>General</Typography>
              </Grid>

              <Grid item xs={12} sm={12}>
                <form noValidate autoComplete="off">
                  <TextField
                    required
                    variant="outlined"
                    id="cardTitle"
                    name="cardTitle"
                    label="Story Event Title"
                    onChange={handleChange}
                    fullWidth
                    defaultValue={cardTitle}
                    autoComplete="off"
                    helperText="The name of your story event."
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
              <form noValidate autoComplete="off">
                  <TextField
                    variant="outlined"
                    id="cardSubtitle"
                    name="cardSubtitle"
                    label="Story Event Subtitle"
                    onChange={handleChange}
                    fullWidth
                    defaultValue={cardSubtitle}
                    autoComplete="off"
                    helperText="Optional. A subtitle for your event. This helps you to distingiush events with a similar name."
                  />
                </form>
              </Grid>
              <Grid item xs={12}>
              <form noValidate autoComplete="off">
                  <TextField
                    variant="outlined"
                    id="cardDescription"
                    name="cardDescription"
                    label="Story Event Description"
                    onChange={handleChange}
                    fullWidth
                    defaultValue={cardDescription}
                    autoComplete="off"
                    helperText="Optional. Provide additional context to your event."
                  />
                </form>
              </Grid>
              <Grid item xs={12} sm={12}><Divider></Divider></Grid>
              <Grid item xs={12} sm={12}>
                <Typography component={'span'} variant={'body2'}>Story Details</Typography>
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <form noValidate autoComplete="off">
                    <TextField
                      variant="filled"
                      id="cardStory"
                      name="cardStory"
                      placeholder="Once upon a time..."
                      onChange={handleChange}
                      fullWidth
                      defaultValue={cardStory}
                      autoComplete="off"
                      helperText="Tell your story here"
                      multiline
                    />
                  </form>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="contained">
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)} color="secondary" autoFocus variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StoryCardEditMask;