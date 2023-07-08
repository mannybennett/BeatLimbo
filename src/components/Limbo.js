import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const Limbo = (props) => {
  console.log(props)
  const { user:auth0User } = useAuth0();

  const getUser = async () => {
    await axios.get(`/api/users/${auth0User.email}`)
    .then(res => props.updateUser(res.data[0]))
  }

  useEffect(() => {
    getUser()
  }, [auth0User]);
console.log("User", props.user)
  return (
    <div>
      <p>Feed</p>
    </div>
  )
};

export default Limbo;