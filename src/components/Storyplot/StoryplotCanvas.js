import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, { 
  ReactFlowProvider,
  removeElements,
  addEdge,
  Controls,
  Background
} from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StoryplotCard from './StoryplotCard';
import StoryplotCreateDialog from './StoryplotCreateDialog';
import StoryplotDeleteDialog from './StoryplotDeleteDialog';

import './StoryplotCanvas.css'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const graphStyles = { width: '100vw', height: '100vh' };
const controlStyles = { left: '95vw'};
const getNodeId = () => `randomnode_${+new Date()}`;
const nodeTypes = {
  storyplotCard: StoryplotCard,
};

const StoryplotCanvas = (props) => {
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(props.elements);
  const [storyName, setStoryname] = useState(props.storyName);
  const [storyId, setStoryId] = useState(props.storyIdentifier);
  const [openEditDialog, setoOpenEditDialog] = useState(false);
  const [openDeleteDiaog, setOpenDeleteDialog] = useState(false);
  const [zoomOnScroll] = useState(false);
  const [zoomOnDoubleClick] = useState(false);

  const classes = useStyles();

  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }

  const onElementsUpdate = (elementToUpdate) => {
    let els = rfInstance.toObject().elements; 
    let updatedEls = els.map(x => {
      if(x.id === elementToUpdate.cardId){
        x.data = elementToUpdate.data
      }
      return x
    })
    setElements(updatedEls);
  }

  useEffect(() => {
    let els = props.elements;
    let cName = props.storyName;
    let sId = props.storyIdentifier;

    try {
      let modifedEls;
      if (els && els !== undefined) {
        modifedEls = props.elements.map(x => {
          if (x.hasOwnProperty('data')) {
            x.data.onRemove = onElementsRemove
            x.data.onUpdate = onElementsUpdate
          }
          return x
        })
        els = modifedEls;
      }
    } 
    catch(err) {
      throw err
    } 
    finally {
      setStoryId(sId);
      setElements(els);
      setStoryname(cName);
    }
  }, [props]);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };


  const onConnect = (params) => {
    params.arrowHeadType = 'arrowclosed';
    params.animated = true;
    setElements((els) => addEdge(params, els))
  }

  const onSave = () => {
    try {
      if (rfInstance) {
        let res = {
          storyId: storyId,
          storyName: storyName,
          flowInstance: rfInstance.toObject()
        }
        props.onUpdateStory(res);
      }
    }
    catch (err) {}
  }

  const handleEditDialogOpen = () => {
    setoOpenEditDialog(true);
  }

  const handleEditDialogCancel = () => {
    setoOpenEditDialog(false);
  }

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  }

  const handleDeleteDialogCancel = () => {
    setOpenDeleteDialog(false);
  }

  const handleEditDialogSubmit = (name) => {
    try {
      let res = {
        storyId: storyId,
        storyName: name,
        flowInstance: rfInstance.toObject()
      }
      setStoryname(name);
      props.onUpdateStory(res);
    }
    catch (err) {}
    finally {
      setoOpenEditDialog(false);
    }
  };
  
  const handleDeleteDialogSubmit = (e) => {
    try {
      let res = {
        storyId: storyId
      }
      props.onDeleteStory(res);
    }
    catch (err) {
      throw err;
    }
    finally {
      setOpenDeleteDialog(false);
    }
  };

  const onAdd = () => {
    const newNode = {
      id: getNodeId(),
      data: { 
        node_label: 'New node',
        node_description: null,
        node_image_label: null,
        node_image_url: null,
        node_story: null,
        node_sublabel: null,
        onRemove: onElementsRemove,
        onUpdate: onElementsUpdate
      },
      position: {
        x: 300,
        y: 100
      },
      type: 'storyplotCard'
    };
    setElements((els) => els.concat(newNode));
  }

    return(
      <ReactFlowProvider>
      <div className="StoryplotWrapper">
        <ReactFlow
          elements={elements}
          onElementsRemove={onElementsRemove}
          onConnect={onConnect}
          onLoad={setRfInstance}
          style={graphStyles}
          zoomOnScroll={zoomOnScroll}
          zoomOnDoubleClick={zoomOnDoubleClick}
          defaultPosition={[50,50]}
          snapToGrid={true}
          defaultZoom={0.99}
          nodeTypes={nodeTypes}
        >
          <Background
              variant="dots"
              gap={12}
              size={0.25}
              color='#eee'
              style={{ background: '#1d1a2d' }}
          />
        </ReactFlow>

        <Controls 
          showInteractive={false}
          style={controlStyles}
        />

        <div className="StoryplotControls {classes.root}">
          <Fab color="primary" size="small" aria-label="add" onClick={onAdd}>
            <AddIcon />
          </Fab>
          <Fab color="primary" size="small" aria-label="edit" onClick={handleEditDialogOpen}>
            <EditIcon />
          </Fab>
          <Fab color="primary" size="small" aria-label="save" onClick={onSave}>
            <SaveIcon />
          </Fab>
          <Fab color="secondary" size="small" aria-label="delete" onClick={handleDeleteDialogOpen}>
            <DeleteIcon />
          </Fab>
        </div>
        <StoryplotCreateDialog
            title="Edit your story"
            text="Change the name of your story or select a new gamesystem."
            open={openEditDialog}
            setOpen={setoOpenEditDialog}
            onConfirm={handleEditDialogSubmit}
            onCancel={handleEditDialogCancel}
            storyName={storyName}
          >
          </StoryplotCreateDialog>
          <StoryplotDeleteDialog 
            onConfirm={handleDeleteDialogSubmit}
            onCancel={handleDeleteDialogCancel}
            open={openDeleteDiaog}
            setOpen={setOpenDeleteDialog}
          >
          </StoryplotDeleteDialog>
          
      </div>
      </ReactFlowProvider>
    )
}

export default StoryplotCanvas;