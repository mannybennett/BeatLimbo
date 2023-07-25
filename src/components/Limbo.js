import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ReactAudioPlayer from 'react-audio-player';
import YoutubeEmbed from './YouTubeEmbed';
import { useMediaQuery, Card, Button, Box, CardContent, CardMedia, Typography, CardActions, Collapse, IconButton, styled, Checkbox, Divider, Modal, TextField, Avatar, CircularProgress, Backdrop, Stack, Chip } from '@mui/material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Limbo = (props) => {
  const { user:auth0User } = useAuth0();
  const [expandedId, setExpandedId] = useState(null);
  const [clickedButton, setClickedButton] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const playerRef = useRef(null);
  // const [allVotes, setAllVotes] = useState([]);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mobileView = useMediaQuery('(max-width: 900px)');
  const space = mobileView ? 0 : 3;

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

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
  }));

  const handleExpandClick = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleChange = (value, postId) => {
    setClickedButton((prevClickedButton) => ({
      ...prevClickedButton,
      [postId]: value,
    }));
    if (postId in clickedButton) {
      updateVote(value, props.user.id, postId)
    } else {
      postVote(value, props.user.id, postId)
    }
  };
  
  const getUser = async () => {
    await axios.get(`/api/users/${auth0User?.email}`)
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

  const updateVote = async (vote, userId, audioFileId) => {
    try {
      await axios.put('/api/limbo', {
        vote: vote,
        user_id: userId,
        audio_file_id: audioFileId
      });
      console.log('Vote updated successfully');
    } catch (error) {
      console.error('Error updating vote:', error);
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

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/limbo/comments/${commentId}`);
      console.log('Comment deleted successfully');
      setComments(comments.filter(comment => comment.id !== commentId))     
    } catch (error) {
      console.error('Error deleting comment:', error);
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
    const fetchVotes = async () => {
      if (props.user) {
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
        setLoading(false)
      } else {
        setLoading(false)
      }
    };

    fetchVotes();
  }, [props.user]);

// console.log("User", props.user)
// console.log("Comments", comments)
// console.log("Files", props.audioFiles)

  return (
    <>
      {loading && 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {!loading &&
      <>
        <Stack marginTop={3} spacing={space} sx={{ minHeight: "100vh" }} direction='row'>
          <Box flex={3} sx={{ display: { xs: "none", xl: "block" } }}></Box>
          <Box flex={5} sx={{ display: 'flex', flexDirection: 'column', paddingLeft: { xs: 3, md: 0 }, paddingRight: { xs: 3, md: 0 } }}>
          {props.audioFiles.length > 0 && 
            props.audioFiles.toReversed().map((file, idx) => {
              const isExpanded = file.id === expandedId;
              return (
                <Card key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: "10px",
                    marginBottom: 3,
                    bgcolor: "#1f1f1f",
                    width: "100%",
                    maxWidth: '2000px',
                    boxShadow: "0px 3px 10px black",
                    // backgroundImage: `url(${grey})`,
                    // backgroundImage: 'linear-gradient(to bottom right, #d91226, #5e0810)',
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
                          <Typography sx={{ width: '100%', wordBreak: 'break-all' }} color="#e8e8e8" variant="h6">
                            {file.title}
                          </Typography>
                          <Typography
                            sx={{  }}
                            variant="p"
                            color="#919191"
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
                        <Box sx={{ display: 'flex', width: '100%', height: "53.99px" }}>
                          <Box sx={{ width: '100%', height: '100%', paddingRight: '5px' }}>
                            <Checkbox
                            checked={clickedButton[file.id] === 'complete'}
                            onChange={() => handleChange('complete', file.id)}
                            value="complete"
                            sx={{ width: '100%', height: '100%' }}
                            icon={<Button sx={{ width: '100%', height: '100%', bgcolor: 'rgba(79, 195, 247, 0.1)' }} color='warning' variant="outlined">COMPLETE</Button>}
                            checkedIcon={<Button sx={{ width: '100%', height: '100%' }} color='warning' variant="contained">COMPLETE</Button>}
                            />
                          </Box>
                          <Box sx={{ width: '10%', height: '100%', display: {xs: 'none', lg: 'flex'}, justifyContent: 'center', alignItems: 'center' }}>
                            <ArrowLeftIcon color="info" />
                            <Typography color="#e8e8e8" component="div" variant="subtitle1">
                              VOTE
                            </Typography>
                            <ArrowRightIcon color="info" />
                          </Box>
                          <Box sx={{ width: '100%', height: '100%', paddingLeft: '5px' }}>
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
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Divider sx={{ backgroundColor: '#3d3d3d' }} variant="middle" />
                    <CardContent>
                      {/* <Typography marginBottom={1.2} color="#e8e8e8" component="div" variant="h5">Comments</Typography> */}
                      {comments.some(comment => expandedId === comment.audio_file_id) ? (
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography sx={{ paddingLeft: '32px' }} color="#e8e8e8" component="div" variant="subtitle1">
                                    {comment.comment}
                                  </Typography>
                                  {comment.user_id === props.user.id &&
                                  <IconButton onClick={() => deleteComment(comment.id)}>
                                    <DeleteIcon sx={{ fill: '#3d3d3d' }} fontSize='small' />
                                  </IconButton>
                                  }                            
                                </Box>                    
                              </Box> 
                            )
                          }
                        })) : <div>No comment</div>
                      }                                 
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton onClick={handleOpen}>
                        <AddBoxIcon sx={{ fill: '#e8e8e8' }} fontSize='large' />
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
                          onChange={(e) => setNewComment(e.target.value)}
                          sx={{
                            marginBottom: 2,
                            background: 'white',
                            borderRadius: 1,
                          }}
                          inputProps={{ maxLength: 100 }}
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
          <Box flex={2} sx={{ display: { xs: "none", md: "block" } }}>
            <Stack paddingRight={{ xs: 3, xl: 0 }} width="100%" spacing={3} position="sticky" top={88}>
              <Box
                sx={{
                  bgcolor: '#1f1f1f',
                  width: '100%',
                  height: '300px',
                  borderRadius: 1,
                  boxShadow: "0px 3px 10px black"
                }}
              >
                <Typography variant='h5' fontWeight='500' color='#e8e8e8'>Carousel?</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: '#1f1f1f',
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  boxShadow: "0px 3px 10px black",
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
                <Typography variant='h5' fontWeight='500' color='#e8e8e8'>Featured Beat</Typography>
                <Typography marginBottom={2} variant='h6' fontWeight='300' color='#919191'>
                  <em>that made it out of </em> 
                  <span style={{color: '#d91226', fontWeight: 400}}><em>Limbo</em></span>
                </Typography>
                <YoutubeEmbed />         
              </Box>
              <Box
                sx={{
                  bgcolor: '#1f1f1f',
                  width: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  boxShadow: "0px 3px 10px black",
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2
                }}
              >
                <Typography marginBottom={1} variant='h5' fontWeight='500' color='#e8e8e8'>General Tips</Typography>
                <Typography marginBottom={2} variant='subtitle1'color='#919191'>To achieve quality beats, keep the following components in mind:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='melody'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='drums'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='mixing'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='arrangement'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='sound selection'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='tempo'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='transitions'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='effects'/>
                  <Chip sx={{ fontSize: '16px', fontWeight: '400', margin: '0 4px 4px 0' }} color='secondary' label='bassline'/>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box flex={3} sx={{ display: { xs: "none", xl: "block" } }}></Box>
        </Stack>
      </>
      }
    </>
  )
};

export default Limbo;