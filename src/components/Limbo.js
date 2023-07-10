import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
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
  }, []);

console.log("User", props.user)
console.log("Files", props.audioFiles)

  return (
    //const setDefaultImg = (e) => {e.target.src = defaultPic}
    //img tag
    <div>
      <p>Feed</p>
      {props.audioFiles && props.audioFiles.length > 0 && (
      <p>{props.audioFiles[0].id}</p>
    )}
    </div>
  )
};

export default Limbo;