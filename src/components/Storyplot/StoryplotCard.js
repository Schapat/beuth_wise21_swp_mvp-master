import React, { useEffect, useRef } from 'react';
import { Handle } from 'react-flow-renderer';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import EditButton from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Divider from '@material-ui/core/Divider';
import StoryCardEditMask from './StorycardEditMask';

import CloseIcon from '@material-ui/icons/Close';

import './StoryplotCard.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    minWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    display: 'none',
  },
  cardSection: {
    margin: '0px'
  },
  cardSectionDivider: {
    margin: '0px 5px 0px 5px'
  },
  editButton: {
    padding: '12px',
    color: '#1d1a2d'
  },
  removeButton: {
    padding: '12px',
    color: 'red',
    margin: '10px auto 0px 5px'
  }
}));

const StoryplotCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [cardId, setCardId] = React.useState(null);
  const [cardTitle, setCardTitle] = React.useState('Untitled Card');
  const [cardSubtitle, setCardSubtitle] = React.useState('');
  const [cardDescription, setCardDescription] = React.useState('');
  const [cardStory, setCardStory] = React.useState('');
  const [cardImageUrl, setCardImageUrl] = React.useState('');
  const [cardImageLabel, setCardImageLabel] = React.useState('');
  const [editMaskOpen, setEditMaskOpen] = React.useState(false);
  const cardMenu = useRef(null);

  useEffect(() => {
    setCardId(props.id);
    setCardTitle(props.data.node_label);
    setCardSubtitle(props.data.node_sublabel);
    setCardDescription(props.data.node_description);
    setCardStory(props.data.node_story);
    setCardImageUrl(props.data.node_image_url);
    setCardImageLabel(props.data.node_image_label);
  }, [props])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRemove = () => {
    props.data.onRemove([props]);
  };


  const handleEditClick = () => {
    setEditMaskOpen(true);
  };

  const handleEditClose = () => {
    setEditMaskOpen(false);
  }

  const handleEditSubmit = (e) => {
    try {
      setCardTitle(e.cardTitle);
      setCardSubtitle(e.cardSubtitle);
      setCardDescription(e.cardDescription);
      setCardStory(e.cardStory);
      props.data.onUpdate({
        cardId: cardId,
        data: {
          node_label: e.cardTitle,
          node_sublabel: e.cardSubtitle,
          node_description: e.cardDescription,
          node_story: e.cardStory,
          node_image_label: cardImageLabel,
          node_image_url: cardImageUrl
        }
      })
    }
    catch (err) { throw err }
    finally {
      setEditMaskOpen(false);
    }
  };

  return (
      <Card className={classes.root}>
        <Handle
        type="target"
        position="left"
        style={{ background: '#F50057', z_index: '999' }}
        onConnect={(params) => { }}
        />
        <Handle
          type="source"
          position="right"
          style={{ background: '#186b25', z_index: '999' }}
          onConnect={(params) => { }}
        />
        <CardHeader 
          avatar={
            <IconButton ref={cardMenu} aria-label="editing" aria-controls="card-options" aria-haspopup="true" onClick={handleEditClick} className={classes.editButton}>
              <EditButton/>
            </IconButton>
          }
          action={
            <IconButton ref={cardMenu} aria-label="settings" aria-controls="card-options" aria-haspopup="true" onClick={handleRemove} className={classes.removeButton}>
              <CloseIcon/>
            </IconButton>
          }
          title={cardTitle}
          subheader={cardSubtitle}
        />

        <Divider variant="middle" className={classes.cardSectionDivider}/>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            { cardDescription }
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>

        
        <Divider variant="middle" className={classes.cardSectionDivider} />
        <Typography className={classes.cardSection} variant="overline" display="block" gutterBottom>Images</Typography>
        <Divider variant="middle" className={classes.cardSectionDivider} />

          <CardContent>
            { cardImageUrl != null ? 
              <CardMedia
              className={classes.media}
              image={ cardImageUrl }
              title={ cardImageLabel }
            />
            :
            <div className={classes.root}>
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            </div>
            }
          
          <Divider variant="middle" className={classes.cardSectionDivider} />
            <Typography className={classes.cardSection} variant="overline" display="block" gutterBottom>Detailed Story Description</Typography>
          <Divider variant="middle" className={classes.cardSectionDivider} />

          <Typography className={classes.cardSection} variant="body2" display="block" gutterBottom>
            {cardStory}
          </Typography>

          </CardContent>
        </Collapse>
        <StoryCardEditMask
          open={editMaskOpen}
          onCancel={handleEditClose}
          onConfirm={handleEditSubmit}
          cardTitle={cardTitle}
          cardDescription={cardDescription}
          cardImageLabel={cardImageLabel}
          cardSubtitle={cardSubtitle}
          cardStory={cardStory}
        >

        </StoryCardEditMask>
      </Card>
  );
}

export default StoryplotCard;