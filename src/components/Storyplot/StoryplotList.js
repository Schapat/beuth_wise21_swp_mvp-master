import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import StoryplotCreateDialog from './StoryplotCreateDialog';

import './StoryplotList.css';

const font = '"Amatic SC", cursive';

const listTheme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Amatic SC", cursive',
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeight: 700,
    fontSize: 16,
    color: '#eee'
  }
});

const useStyles = makeStyles((listTheme) => ({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'transparent',
    color: '#eee',
    marginTop: '2rem'
  },
  item: {
    marginLeft: '2rem',
    fontWeight: 700,
    paddingRight: '50px',
    typography: {
      fontFamily: font,
      fontSize: 16,
      fontWeight: 700,
      color: '#eee'
    },
    color: '#eee'
  },
  itemText: {
    fontWeight: 700,
    color: '#eee',
    fontSize: 16
  },
  itemSelected: {
    background: '#eee',
    color: '#1d1a2d' 
  },
  itemIcon: {
    color: '#eee'
  },
  divider: {
    borderTop: '1px solid #eee'
  }
}));

const StoryplotList = (props) => {
  const classes = useStyles();
  const [stories, setStories] = React.useState(props.stories);
  const [openCreateDialog, setoOpenCreateDialog] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    setStories(props.stories);
  }, [props]);

  const handleDialogOpen = () => {
    setoOpenCreateDialog(true);
  }

  const handleDialogCancel = () => {
    setoOpenCreateDialog(false);
  }

  const handleDialogSubmit = (e) => {
    try {
      props.onAddNewStory(e);
    }
    catch (err) {}
    finally {
      setoOpenCreateDialog(false);
    }
  };
  
  const handleClick = (e) => {
    props.onSelectStory(e);
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main stories plots">
      { stories.map((text, index) => (
        <ThemeProvider theme={listTheme}>
          <ListItem
            className={classes.item }
            button
            key={index}
            data-index={index}
            onClick={(e) => handleClick(e) }
          >   
          <ListItemText primary={text} className={classes.itemText} style={{color: '#eee !important'}}/>
            
          </ListItem>
          </ThemeProvider>
        )) }
      </List>
      <Divider className={classes.divider} variant='middle'/>

      
      <List component="nav" aria-label="secondary stories add">
        <ThemeProvider theme={listTheme}>
        <ListItem
          className={classes.item}
          key='addBtn'
          button
          onClick={handleDialogOpen}
        >
          <ListItemIcon className={classes.itemIcon}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText className={classes.itemText} primary="Add new" />
        </ListItem>
        </ThemeProvider>
          <StoryplotCreateDialog
            title="Create a new story"
            text="Before you go ahead and get creative, you should give your story a name. Don't worry: You can always change the name of the story later on."
            open={openCreateDialog}
            setOpen={setoOpenCreateDialog}
            onConfirm={handleDialogSubmit}
            onCancel={handleDialogCancel}
          >
          </StoryplotCreateDialog>
      </List>
    </div>
  );
}

export default StoryplotList;