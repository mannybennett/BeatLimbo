import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Resources from './Resources';
import MostPlayed from './MostPlayed';
import FeaturedBeat from './FeaturedBeat';
import Post from './Post';
import { useMediaQuery, Box, CircularProgress, Backdrop, Stack } from '@mui/material';
import '../styles/Limbo.css';

const Limbo = (props) => {
  const { user:auth0User } = useAuth0();
  const [expandedId, setExpandedId] = useState(null);
  const [clickedButton, setClickedButton] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [play, setPlay] = useState(false);
  const [highlightMostPlayed, setHighlightMostPlayed] = useState(false);

  const navigate = useNavigate();

  const postRef = useRef(null);

  const handleScroll = () => {
    postRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightMostPlayed(true);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mobileView = useMediaQuery('(max-width: 900px)');
  const space = mobileView ? 0 : 3;

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
    !auth0User && navigate('/')
    await axios.get(`https://beatlimbo-backend.onrender.com/api/users/${auth0User.email}`)
    .then(res => {props.updateUser(res.data[0]);})
  }

  const getAudioFiles = async () => {
    await axios.get('https://beatlimbo-backend.onrender.com/api/audioFiles/')
    .then(res => props.getFiles(res.data))
  }
  
  const getAllVotes = async () => {
    try {
      const response = await axios.get('https://beatlimbo-backend.onrender.com/api/limbo/');
      return response.data;
    } catch (error) {
      console.log('Error fetching votes:', error);
      throw error;
    }
  };
  
  const getAllComments = async () => {
    try {
      const response = await axios.get('https://beatlimbo-backend.onrender.com/api/limbo/comments');
      return setComments(response.data)
    } catch (error) {
      console.log('Error fetching votes:', error);
      throw error;
    }
  };

  const postVote = async (vote, userId, audioFileId) => {
    try {
      await axios.post('https://beatlimbo-backend.onrender.com/api/limbo', {
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
      await axios.put('https://beatlimbo-backend.onrender.com/api/limbo', {
        vote: vote,
        user_id: userId,
        audio_file_id: audioFileId
      });
      console.log('Vote updated successfully');
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  const playCount = async (id) => {
    try {
      await axios.put(`https://beatlimbo-backend.onrender.com/api/audioFiles/${id}/playCount`, {});
      setPlay((prevState) => !prevState);
      console.log('Count updated successfully');
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  const postComment = async (comment, userId, userName, audioFileId, profilePicture) => {
    try {
      await axios.post('https://beatlimbo-backend.onrender.com/api/limbo/comments', {
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
      await axios.delete(`https://beatlimbo-backend.onrender.com/api/limbo/comments/${commentId}`);
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
  }, [play]);
  
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
          setLoading(false)
        } catch (error) {
          return console.log('Error:', error)
        }
      }
    };

    fetchVotes();
  }, [props.user]);

  useEffect(() => {
    if (highlightMostPlayed) {
      const timeout = setTimeout(() => {
        setHighlightMostPlayed(false);
      }, 3500);
  
      return () => clearTimeout(timeout);
    }
  }, [highlightMostPlayed]);

  const mostPlays = Math.max(...props.audioFiles.map((file) => file.plays));
  const mostPlayedFile = props.audioFiles.find((file) => file.plays === mostPlays);

  const [prevRef, setPrevRef] = useState(null); 

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
        <Stack sx={{ minHeight: "100vh" }} spacing={space} direction='row'>
          <Box flex={{ md: 0.5, xl: 3 }} display={{ xs: "none", lg: "block" }}></Box>
          <Box className='postsContainer' flex={5} paddingLeft={{ xs: 3, md: 0 }} paddingRight={{ xs: 3, md: 0 }}>
            {props.audioFiles.length > 0 && 
              props.audioFiles.toReversed().map((file, idx) => {
                const isExpanded = file.id === expandedId;
                const isMostPlayed = file === mostPlayedFile;
                return (
                  <Post
                    idx={idx}
                    isMostPlayed={isMostPlayed}
                    postRef={postRef}
                    highlightMostPlayed={highlightMostPlayed}
                    file={file}
                    user={props.user}
                    playCount={playCount}
                    clickedButton={clickedButton}
                    handleChange={handleChange}
                    isExpanded={isExpanded}
                    handleExpandClick={handleExpandClick}
                    comments={comments}
                    deleteComment={deleteComment}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                    sendComment={sendComment}
                    setNewComment={setNewComment}
                    open={open}
                    expandedId={expandedId}
                    mobileView={mobileView}
                    prevRef={prevRef}
                    setPrevRef={setPrevRef}
                  />
                )
              })
            }
          </Box>
          <Box flex={2} display={{ xs: "none", md: "block" }}>
            <Stack className='sideStack' paddingRight={{ xs: 3, xl: 0 }} spacing={3} top={88}>
              <MostPlayed mostPlayedFile={mostPlayedFile} handleScroll={handleScroll}/>
              <FeaturedBeat />         
              <Resources />
            </Stack>
          </Box>
          <Box flex={{ md: 0.5, xl: 3 }} display={{ xs: "none", lg: "block" }}></Box>
        </Stack>
      </>
      }
    </>
  )
};

export default Limbo;