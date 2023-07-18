import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ReactAudioPlayer from 'react-audio-player';
import { useMediaQuery, Card, Button, Box, CardContent, CardMedia, Typography, CardActions, Collapse, IconButton, styled, Checkbox, Divider, Modal, TextField, Avatar } from '@mui/material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Limbo = (props) => {
  const { user:auth0User } = useAuth0();
  const [expandedId, setExpandedId] = useState(null);
  const [clickedButton, setClickedButton] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
  // const [allVotes, setAllVotes] = useState([]);
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mobileView = useMediaQuery('(max-width: 600px)');

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: mobileView ? '50%' : '49.7%',
    transform: 'translate(-50%, -50%)',
    width: mobileView ? '90%' : '50%',
    maxWidth: '900px',
    bgcolor: '#1f1f1f',
    borderRadius: 1,
    boxShadow: 24,
    p: 2,
    textAlign: "center"
  };

  const inputComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleExpandClick = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleChange = (value, postId) => {
    setClickedButton((prevClickedButton) => ({
      ...prevClickedButton,
      [postId]: value,
    }));
    postVote(value, props.user.id, postId)
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: 'transform 1s'
  }));
  
  const getUser = async () => {
    await axios.get(`/api/users/${auth0User.email}`)
    .then(res => props.updateUser(res.data[0]))
  }

  const getAudioFiles = async () => {
    await axios.get('/api/audioFiles/')
    .then(res => props.getFiles(res.data))
  }
  
  const getAllVotes = async () => {
    try {
      const response = await axios.get('/api/limbo/');
      return response.data;
    } catch (error) {
      console.log('Error fetching votes:', error);
      throw error;
    }
  };
  
  const getAllComments = async () => {
    try {
      const response = await axios.get('/api/limbo/comments');
      return setComments(response.data)
    } catch (error) {
      console.log('Error fetching votes:', error);
      throw error;
    }
  };

  const postVote = async (vote, userId, audioFileId) => {
    try {
      await axios.post('/api/limbo', {
        vote: vote,
        user_id: userId,
        audio_file_id: audioFileId
      });
      console.log('Vote posted successfully');
    } catch (error) {
      console.error('Error posting vote:', error);
    }
  };

  const postComment = async (comment, userId, userName, audioFileId, profilePicture) => {
    try {
      await axios.post('/api/limbo/comments', {
        comment: comment,
        user_id: userId,
        user_name: userName,
        audio_file_id: audioFileId,
        profile_picture: profilePicture
      });
      getAllComments()
      console.log('Comment posted successfully');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const sendComment = async (e) => {
    e.preventDefault()
    await postComment(newComment, props.user.id, props.user.user_name, expandedId, props.user.profile_picture)
    handleClose()
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getAudioFiles();
  }, []);

  useEffect(() => {
    getAllComments()
  }, []);

  useEffect(() => {
    // NOT WORKING ON FIRST RENDER
    const fetchVotes = async () => {
      try {
        const votes = await getAllVotes();
        const userVotes = votes.filter(vote => vote.user_id === props.user.id);
        setClickedButton(
          userVotes.reduce((acc, vote) => {
            acc[vote.audio_file_id] = vote.vote;
            return acc;
          }, {})
        );
      } catch (error) {
        return console.log('Error:', error)
      }
    };

    fetchVotes();
  }, []);


// console.log("User", props.user)
console.log("Comments", comments)
// console.log("Files", props.audioFiles)

  return (
    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      {/* <Typography variant='h3' component='div' color='#e8e8e8'>LIMBO</Typography> */}
      {props.audioFiles.length > 0 && 
        props.audioFiles.map((file, idx) => {
          const isExpanded = file.id === expandedId;
          return (
            <Card key={idx} sx={{ display: 'flex', flexDirection: 'column', padding: "10px", marginBottom: 5, bgcolor: "#1f1f1f", width: "90%", maxWidth: '1000px', boxShadow: "1px 5px 20px black" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, borderRadius: 1, marginBottom: '10px', marginRight: '10px'}}
                      image={file.image}
                      alt="Track Image"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                      <Typography sx={{ width: '100%' }} color="#e8e8e8" component="div" variant="h6">
                        {file.title}
                      </Typography>
                      <Typography
                        sx={{  }}
                        variant="p"
                        color="#919191"
                        component="div"
                      >
                        {file.user_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: 'flex-start', flexDirection: 'column', width: "100%" }}>
                    <ReactAudioPlayer
                      className='audioPlayer'
                      src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
                      controls
                      controlsList='nodownload noplaybackrate'
                    />
                    <Box sx={{ display: 'flex', width: '100%', height: "53.99px", bgcolor: '' }}>
                      <Box sx={{ width: '50%', height: '100%', paddingRight: '5px' }}>
                        <Checkbox
                        checked={clickedButton[file.id] === 'complete'}
                        onChange={() => handleChange('complete', file.id)}
                        value="complete"
                        sx={{ width: '100%', height: '100%' }}
                        icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(79, 195, 247, 0.1)' }} color='warning' variant="outlined">COMPLETE</Button>}
                        checkedIcon={<Button sx={{ width: '100%', height: '100%' }} color='warning' variant="contained">COMPLETE</Button>}
                      />
                      </Box>
                      <Box sx={{ width: '50%', height: '100%', paddingLeft: '5px' }}>
                        <Checkbox
                        checked={clickedButton[file.id] === 'delete'}
                        onChange={() => handleChange('delete', file.id)}
                        value="delete"
                        sx={{ width: '100%', height: '100%' }}
                        icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(217, 18, 38, 0.1)' }} color='secondary' variant="outlined">DELETE</Button>}
                        checkedIcon={<Button sx={{ width: '100%', height: '100%' }} color='secondary' variant="contained">DELETE</Button>}
                      />
                      </Box>
                    </Box>
                  </Box>
                </Box>    
              </Box>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={isExpanded}
                  onClick={() => handleExpandClick(file.id)}
                  aria-expanded={isExpanded}
                  aria-label="show more"
                >
                  <InsertCommentOutlinedIcon color='info' fontSize='medium' />
                </ExpandMore>
              </CardActions>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Divider sx={{ backgroundColor: '#919191' }} variant="middle" />
                <CardContent>
                  <Typography marginBottom={1.2} color="#e8e8e8" component="div" variant="h5">Comments</Typography>
                  {comments.length > 0 &&
                    comments.map((comment, idx) => {
                      if (expandedId === comment.audio_file_id) {
                        return (
                          <Box sx={{ marginBottom: 1 }} key={idx}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} alt='' src={comment.profile_picture} />
                              <Typography                            
                                variant="p"
                                color="#919191"
                                component="div"
                              >
                                {comment.user_name}
                              </Typography>
                            </Box>                    
                            <Typography sx={{ paddingLeft: '32px' }} color="#e8e8e8" component="div" variant="subtitle1">
                              {comment.comment}
                            </Typography>
                            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Divider sx={{ backgroundColor: '#919191', margin: '12px 0', width: '60%' }} />                  
                            </Box> */}
                          </Box> 
                        )
                      }
                  })}                  
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton>
                    <AddBoxIcon onClick={handleOpen} sx={{ fill: '#e8e8e8' }} fontSize='large' />
                  </IconButton>
                </Box>                
              </Collapse>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                slotProps={{
                  backdrop: {
                    sx: {
                      opacity: '0.3 !important',
                      position: 'fixed !important',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }
                  }
                }}
              >
                <Box sx={modalStyle}>
                  <form onSubmit={sendComment} className='commentForm'>
                    <TextField
                      onChange={inputComment}
                      sx={{
                        marginBottom: 2,
                        background: 'white',
                        borderRadius: 1,
                      }}
                      inputProps={{ maxLength: 80 }}
                      fullWidth={true}
                      color='primary'
                      label="Comment"
                      variant="filled"
                      multiline
                      required
                    />
                    <Button sx={{ width: '20%' }} type='submit' variant='contained'>POST</Button>
                  </form>                  
                </Box>
              </Modal>
            </Card>
          )
        }
      )}
    </Box>
  )
};

export default Limbo;