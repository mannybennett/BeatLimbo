import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import CardCollapse from './CardCollapse';
import ModalLimbo from './ModalLimbo';
import { Box, Card, CardMedia, Typography, Checkbox, Button, CardActions, IconButton, styled } from '@mui/material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

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
    mobileView
  } = props;

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
  }));

  return (
    <Card
      ref={isMostPlayed ? postRef : null}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: "10px",
        marginBottom: 3,
        bgcolor: "#1f1f1f",
        width: "100%",
        maxWidth: '2000px',
        boxShadow: isMostPlayed && highlightMostPlayed ? "0px 0px 20px 5px #d91226" : "0px 3px 10px black",
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <CardMedia
              component="img"
              sx={{ width: 80, height: 80, borderRadius: 1, marginBottom: '10px', marginRight: '10px'}}
              image={file.image}
              alt="Track Image"
              />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '10px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{ width: '100%', wordBreak: 'break-all' }} color="#e8e8e8" variant="h6">
                  {file.title}
                </Typography>
                <Typography variant="p" color="#919191">
                  {file.user_name}
                </Typography>
              </Box>
              <Typography variant="subtitle2" color="#919191">
                {`${file.plays ? file.plays : '0'} plays`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: 'flex-start', flexDirection: 'column', width: "100%" }}>
            <ReactAudioPlayer
              className='audioPlayer'
              src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
              controls
              controlsList='nodownload noplaybackrate'
              onPlay={() => user.id !== file.user_id && playCount(file.id)}
            />
            <Box sx={{ display: 'flex', width: '100%', height: "53.99px" }}>
              <Box sx={{ width: '100%', height: '100%', paddingRight: '5px' }}>
                <Checkbox
                  checked={clickedButton[file.id] === 'complete'}
                  onChange={() => handleChange('complete', file.id)}
                  value="complete"
                  sx={{ width: '100%', height: '100%' }}
                  icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(255, 255, 255, 0.1)' }} color='primary' variant="outlined">finish this</Button>}
                  checkedIcon={<Button sx={{ width: '100%', height: '100%' }} color='secondary' variant="contained">finish this</Button>}
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
                  sx={{ width: '100%', height: '100%' }}
                  icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(255, 255, 255, 0.1)' }} color='primary' variant="outlined">move on</Button>}
                  checkedIcon={<Button sx={{ width: '100%', height: '100%' }} color='secondary' variant="contained">move on</Button>}
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
          <InsertCommentOutlinedIcon color='info' fontSize='medium' />
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
  )
};

export default Post;