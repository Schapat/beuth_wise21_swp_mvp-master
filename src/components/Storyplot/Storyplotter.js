import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StoryplotCanvas from './StoryplotCanvas';
import StoryplotList from './StoryplotList';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: '#1d1a2d'
  },
  loadingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
}));
const axios = require('axios').default;
const baseURL = 'https://swp.benschdev.net/storyplots';


const Storyplotter = (props) => {
  const classes = useStyles();
  const [data, setData] = React.useState([{}]);
  const [dataIsFetched, setDataIsFetched] = React.useState(false);
  const [stories, setStories] = React.useState([]);
  const [currentStoryElements, setCurrentStoryElements] = React.useState([]);
  const [currentStoryIdentifier, setCurrentStoryIdentifier] = React.useState('');
  const [currentStoryName, setCurrentStoryName] = React.useState('');

  const createStoryplotInDB = async (story_data) => {
    try {
      const response = await axios({
        method: 'post',
        url: baseURL,
        data: story_data
      });
    }
    catch(err) {
      // a proper error handling and logging should be implemented here. 
     alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
  }

  const addNewStoryboard = (n) => {
    const source = axios.CancelToken.source()
    try {
      const newStory = {
        id: parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", "")),
        story_name: n,
        storyplot_nodes: [],
        author_id: 1
      }
      const updatedData = [...data, newStory];
  
      setData(updatedData);
      setStories(updatedData.map((i) => i.story_name));
  
      createStoryplotInDB(newStory);
    }
    catch(err){
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }

    return () => {
      source.cancel()
    }
    
  };

  const loadNewStory = (i) => {
    try {
      setCurrentStoryIdentifier(data[i.currentTarget.getAttribute('data-index')].id);
      setCurrentStoryElements(data[i.currentTarget.getAttribute('data-index')].storyplot_nodes);
      setCurrentStoryName(data[i.currentTarget.getAttribute('data-index')].story_name);
    } catch(err){
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
  }

  const updateStoryplotInDB = async (story_id, story_data) => {
    try {
      const response = await axios({
        method: 'put',
        url: baseURL,
        data: story_data,
        params: {
          id: story_id
        }
      });
    }
    catch(err) {
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
  }

  const updateStory = (e) => {
    const source = axios.CancelToken.source()
    try {
      let updatedData = data.map(item => 
        item.id === e.storyId ? {...item, storyplot_nodes: e.flowInstance.elements, story_name: e.storyName} : item
      )
      setData(updatedData);
      setStories(updatedData.map((item) => item.story_name));

      if(updatedData.find(i => i.id === e.storyId)){
        setCurrentStoryElements(updatedData.find(item => item.id == e.storyId).storyplot_nodes);
        updateStoryplotInDB(
          currentStoryIdentifier,
          updatedData.find(i => i.id === e.storyId)
        )
      }
    }
    catch (err){
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
    return () => {
      source.cancel()
    }
  }

  const deleteStoryplotInDB = async (story_id) => {
    try {
      const response = await axios({
        method: 'delete',
        url: baseURL,
        params: {
          id: story_id
        }
      });
    }
    catch(err) {
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
  }

  const deleteStory = (e) => {
    const source = axios.CancelToken.source()
    try {
      let updatedData = data.filter(item => 
        item.id !== e.storyId
      )
      setData(updatedData);
      setStories(updatedData.map((item) => item.story_name));
      setCurrentStoryElements([]);
      setCurrentStoryIdentifier(null);
      setCurrentStoryName(null);

      deleteStoryplotInDB(e.storyId);
    }
    catch (err){
      // a proper error handling and logging should be implemented here. 
      alert(`There was an unexpected error. Your story could not be updated. Please try again later ¯\_(ツ)_/¯`);
    }
    return () => {
      source.cancel()
    }
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchStoryplots = async () => {
      try {
        setDataIsFetched(false)
        const response = await axios.get(baseURL);
        
        setData(response.data.data);
        
        setStories(response.data.data.map((i) => i.story_name));
        setDataIsFetched(true);
      }
      catch(e){
        setDataIsFetched(false);
        if (axios.isCancel(e)) {
        } else {
            throw e
        }
      }
    }
    fetchStoryplots();

    return () => {
      source.cancel()
    }
  }, []);

  return (
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={3} sm={3}>
          <StoryplotList stories={stories} onAddNewStory = {addNewStoryboard} onSelectStory = {loadNewStory}/> 
      </Grid>
      
      <Grid item xs={9} sm={9}>
        {
          !dataIsFetched &&
          <div className={classes.loadingIndicator}>
            <CircularProgress color="secondary" />
          </div>
        }
        {
          dataIsFetched && 
          <StoryplotCanvas 
            elements={currentStoryElements} 
            onSaveStory={updateStory} 
            onUpdateStory={updateStory}
            onDeleteStory={deleteStory}
            storyName={currentStoryName} 
            storyIdentifier={currentStoryIdentifier}  
          /> 
        }      
      </Grid>
    </Grid>
  )
}

export default Storyplotter;