import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ReactAudioPlayer from 'react-audio-player';
import { Card, Button, Box, CardContent, CardMedia, Typography, CardActions, Collapse, IconButton, styled, Checkbox } from '@mui/material';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';

const Limbo = (props) => {
  const { user:auth0User } = useAuth0();
  const [expandedId, setExpandedId] = useState(null);

  const handleExpandClick = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto'
  }));

  const getUser = async () => {
    await axios.get(`/api/users/${auth0User.email}`)
    .then(res => props.updateUser(res.data[0]))
  }

  const getAudioFiles = async () => {
    await axios.get('/api/audioFiles/')
    .then(res => props.getFiles(res.data))
  }

  useEffect(() => {
    getUser()
    getAudioFiles()
    //refresh with new uploads?
  }, []);

console.log("User", props.user)
console.log("Files", props.audioFiles)

  return (
    <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
      {props.audioFiles.length > 0 && 
        props.audioFiles.map((file, idx) => {
          const isExpanded = file.id === expandedId;
          return (
            <Card key={idx} sx={{ display: 'flex', flexDirection: 'column', padding: "10px", marginBottom: 5, bgcolor: "#1f1f1f", width: "70%", boxShadow: "1px 5px 20px black" }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>                
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 150, height: 150, borderRadius: 1, marginBottom: '10px'}}
                      image={file.image}
                      alt="Track Image"
                    />
                    <Typography
                      sx={{ width: '100%', height: "53.99px", borderRadius: 1, textAlign: 'center', lineHeight: '53.99px' }}
                      variant="h5"
                      color="#d91226"
                      component="div">
                        {file.user_name}
                    </Typography>
                  </Box>
                  {/* FIX BREAKPOINTS */}
                  <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: 'flex-start', flexDirection: 'column', width: "100%" }}>
                    <Typography color="#e8e8e8" component="div" variant="h3" paddingBottom={2}>
                      {file.title}
                    </Typography>
                    <ReactAudioPlayer
                      className='audioPlayer'
                      src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
                      controls
                      controlsList='nodownload noplaybackrate'
                    />
                    <Box sx={{ display: 'flex', width: '100%', height: "53.99px", bgcolor: '' }}>
                      <Checkbox
                        icon={<Button variant="outlined">LIKE</Button>}
                        checkedIcon={<Button variant="contained">LIKE</Button>}
                      />
                      <Checkbox
                        icon={<Button variant="outlined">DISLIKE</Button>}
                        checkedIcon={<Button variant="contained">DISLIKE</Button>}
                      />
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
                <CardContent>
                  <Typography color="#e8e8e8" component="div" variant="h5">Comments</Typography>
                  <Typography color="#e8e8e8" component="div" variant="subtitle1">
                    This audio clip is very interesting, I appreciate the way it was mixed but am not sure about your sound selection. Keep up the good work.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          )
        }
      )}
    </Box>
  )
};

{/* <Box sx={{ display: { xs: "flex", sm: "none" }, width: "100%" }}>
  <ReactAudioPlayer
    className='audioPlayer'
    src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
    controls
    controlsList='nodownload noplaybackrate'
  />
</Box> */}

export default Limbo;