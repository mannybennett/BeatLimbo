import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ReactAudioPlayer from 'react-audio-player';
//import defaultPic from ...

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
    //const setDefaultImg = (e) => {e.target.src = defaultPic}
    //img tag
    <div>
      <h2>Feed</h2>
      {props.audioFiles.length > 0 && 
        props.audioFiles.map((file, idx) => {
          return (
            <div key={idx}>
              <h4>{file.title}</h4>
              <ReactAudioPlayer
              src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
              controls
              controlsList='nodownload noplaybackrate' />
            </div>
          )
        }
      )}
    </div>
  )
};

export default Limbo;