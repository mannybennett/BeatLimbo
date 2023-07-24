import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FileUploader } from "react-drag-drop-files";
import {TextField, Button, CircularProgress, Backdrop} from '@mui/material';

const ProfileCreation = () => {
  const { user:auth0User } = useAuth0();
  const [user, setUser] = useState(auth0User);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const navigation = (e) => {
    e.preventDefault();
    // Create new component instead to welcome users that has link to feed component (limbo)
    navigate("/limbo");
  }

  const getUser = async () => {
    setLoading(true)
    await axios.get(`/api/users/${auth0User.email}`)
    .then(res => {
      if (res.data.length) {
        navigate("/limbo")
      }
    })
    setLoading(false)
  };

  useEffect(() => {
    if (auth0User) {
      getUser()
    } 
  }, [auth0User]);

  const s3Client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_KEY,
      secretAccessKey: process.env.REACT_APP_S_KEY
    }
  });

  const uploadObjectParams = (file) => {
    return {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: file.name,
      Body: file
    }
  };

  const uploadObject = async (file) => {
    try {
      const command = new PutObjectCommand(uploadObjectParams(file));
      const response = await s3Client.send(command);
      console.log('Object uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading object:', error);
    }
  };

  const selectPic = (file) => {
    setUser({
      ...user,
      picture: file.name
    })
    uploadObject(file)
  };

  const selectUsername = (e) => {
    setUser({
      ...user,
      nickname: e.target.value
    })
    setUserName(e.target.value)
  };

  const createUser = async () => {
    if (userName) {
      try {
        await axios.post('/api/users', {
          user_name: user.nickname,
          email: auth0User.email,
          profile_picture: user.picture ? `https://myfirstaudiobucket.s3.amazonaws.com/${user.picture}` : null
        });
        console.log('User Created successfully');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const fileTypes = ["jpg", "png", "jpeg"];

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
        <div>
          <p>Select Profile Picture and Username</p>
          <form onSubmit={navigation}>
            <FileUploader onSelect={selectPic} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
            <br></br>
            <TextField inputProps={{ maxLength: 20 }} onChange={selectUsername} label="Username" variant="outlined" required></TextField>
            <Button type="submit" onClick={createUser} variant="contained">Submit</Button>
            <br></br>
            {console.log()}
          </form>
        </div>
      }
    </>
  );
};

export default ProfileCreation;