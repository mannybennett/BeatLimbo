import React, { useState, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import CardCollapse from './CardCollapse';
import ModalLimbo from './ModalLimbo';
import { Box, Card, CardMedia, Typography, Checkbox, Button, CardActions, IconButton, styled } from '@mui/material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import '../styles/Post.css'

const Post = (props) => {
  const {
    isMostPlayed,
    postRef,
    highlightMostPlayed,
    file,
    user,
    playCount,
    clickedButton,
    handleChange,
    isExpanded,
    handleExpandClick,
    comments,
    deleteComment,
    handleOpen,
    handleClose,
    sendComment,
    setNewComment,
    open,
    expandedId,
    mobileView,
    prevRef,
    setPrevRef
  } = props;

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
  }));

  const checkboxStyle =
  {
    width: '100%',
    height: '100%',
    padding: '0 !important',
    borderRadius: '4px !important',
    transition: 'background-color 0.3s !important',
    '&:hover': {
      backgroundColor: '#424242 !important'
    }
  };

  const currentRef = useRef(null);

  const handlePlay = () => {
    if (prevRef !== null && prevRef !== currentRef) {
      prevRef.current.audioEl.current.pause();
    };
    setPrevRef(currentRef)
  };

  return (
    <Card
      className='postContainer'
      ref={isMostPlayed ? postRef : null}
      sx={{
        boxShadow: isMostPlayed && highlightMostPlayed ? "0px 0px 20px 10px #d91226" : "0px 3px 10px black",
      }}
    >
      <Box className='postSections'>
        <Box className='postMain'>
          <Box className='picAndText'>
            <CardMedia
              className='pfp'
              component="img"
              image={file.image}
              alt="Track Image"
            />
            <Box className='textContainer'>
              <Box className='postSections'>
                <Typography className='title' variant="h6">
                  {file.title}
                </Typography>
                <Typography className='userColor' variant="p">
                  {file.user_name}
                </Typography>
              </Box>
              <Typography className='userColor' variant="subtitle2">
                {file.plays === 1 ? `${file.plays} play` : `${file.plays ? file.plays : '0'} plays`}
              </Typography>
            </Box>
          </Box>
          <Box className='playerAndButtons'>
            <ReactAudioPlayer
              ref={currentRef}
              className='audioPlayer'
              src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
              controls
              controlsList='nodownload noplaybackrate'
              onPlay={() => {handlePlay(); user.id !== file.user_id && playCount(file.id);}}
            />
            <Box className='checkboxesContainer'>
              <Box className='leftCheckbox'>
                <Checkbox
                  checked={clickedButton[file.id] === 'complete'}
                  onChange={() => handleChange('complete', file.id)}
                  value="complete"
                  sx={checkboxStyle}
                  icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(255, 255, 255, 0.1)', letterSpacing: 0.5, display: 'flex' }} color='primary' variant="contained"><ThumbUpAltIcon sx={{ display: {xs: 'flex', sm: 'none'}, paddingRight: '4px'}} fontSize='small'/>finish this</Button>}
                  checkedIcon={<Button sx={{ width: '100%', height: '100%', letterSpacing: 0.5, display: 'flex' }} color='secondary' variant="contained"><ThumbUpAltIcon sx={{ display: {xs: 'flex', sm: 'none'}, paddingRight: '4px'}} fontSize='small'/>finish this</Button>}
                />
              </Box>
              <Box sx={{ width: '10%', height: '100%', display: {xs: 'none', sm: 'flex'}, justifyContent: 'center', alignItems: 'center', marginLeft: '5px', marginRight: '5px' }}>
                <ThumbsUpDownIcon color='info' fontSize='large' />
              </Box>
              <Box sx={{ width: '100%', height: '100%', paddingLeft: '5px' }}>
                <Checkbox
                  checked={clickedButton[file.id] === 'delete'}
                  onChange={() => handleChange('delete', file.id)}
                  value="delete"
                  sx={checkboxStyle}
                  icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(255, 255, 255, 0.1)', letterSpacing: 0.5, display: 'flex' }} color='primary' variant="contained"><ThumbDownAltIcon sx={{ display: {xs: 'flex', sm: 'none'}, paddingRight: '4px'}} fontSize='small'/>move on</Button>}
                  checkedIcon={<Button sx={{ width: '100%', height: '100%', letterSpacing: 0.5, display: 'flex' }} color='secondary' variant="contained"><ThumbDownAltIcon sx={{ display: {xs: 'flex', sm: 'none'}, paddingRight: '4px'}} fontSize='small'/>move on</Button>}
                />
              </Box>
            </Box>
          </Box>
        </Box>    
      </Box>
      <CardActions sx={{ paddingRight: 0 }}>
        <ExpandMore
          expand={isExpanded}
          onClick={() => handleExpandClick(file.id)}
          aria-expanded={isExpanded}
          aria-label="show more"
          >
          <InsertCommentOutlinedIcon className='commentIcon' color='info' fontSize='medium' />
        </ExpandMore>
      </CardActions>
      <CardCollapse
        isExpanded={isExpanded}
        comments={comments}
        expandedId={expandedId}
        user={user}
        deleteComment={deleteComment}
        handleOpen={handleOpen}
      />
      <ModalLimbo
        open={open}
        handleClose={handleClose}
        sendComment={sendComment}
        setNewComment={setNewComment}
        mobileView={mobileView}
      />
    </Card>
  );
};

export default Post;