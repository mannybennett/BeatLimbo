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

  useEffect(() => {
    getUser()
  }, []);

console.log("User", props.user)

  return (
    //const setDefaultImg = (e) => {e.target.src = defaultPic}
    //img tag
    <div>
      <p>Feed</p>
      <img src={props.user.profile_picture} alt='img'></img>
    </div>
  )
};

export default Limbo;