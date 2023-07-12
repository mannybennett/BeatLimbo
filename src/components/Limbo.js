import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ReactAudioPlayer from 'react-audio-player';
import { Card, Box, CardContent, CardMedia, Typography  } from '@mui/material';

const Limbo = (props) => {
  const { user:auth0User } = useAuth0();

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
      <h2>Limbo</h2>
      {props.audioFiles.length > 0 && 
        props.audioFiles.map((file, idx) => {
          return (
            // <div key={idx}>
            //   <h4>{file.title}</h4>
            //   <ReactAudioPlayer
            //   src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
            //   controls
            //   controlsList='nodownload noplaybackrate' />
            // </div>
            <Card key={idx} sx={{ display: 'flex', marginBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={file.image}
                alt="Track Image"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    {file.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {file.user_name}
                  </Typography>
                </CardContent>
                <ReactAudioPlayer
                  src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
                  controls
                  controlsList='nodownload noplaybackrate'
                />
              </Box>
            </Card>
          )
        }
      )}
    </Box>
  )
};

export default Limbo;