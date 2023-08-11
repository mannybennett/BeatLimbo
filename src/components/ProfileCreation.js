import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FileUploader } from "react-drag-drop-files";
import { TextField, Button, CircularProgress, Backdrop, Box, Typography } from '@mui/material';
import '../styles/ProfileCreation.css'

const ProfileCreation = () => {
  const { user:auth0User, isLoading } = useAuth0();
  const [user, setUser] = useState(auth0User);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const navigation = (e) => {
    e.preventDefault();
    navigate("/limbo");
  }

  const getUser = async () => {
    if (!isLoading && auth0User) {
      await axios.get(`https://beatlimbo-backend.onrender.com/api/users/mannybennett99@gmail.com`)
      .then(res => {
        console.log("Response:", res)
        // if (res.data.length) {
        //   console.log("Response:", res)
        //   navigate("/limbo")
        // }
      })
    setLoading(false)
    }    
  };

  useEffect(() => {
    if (!isLoading && auth0User) {
      getUser();
      console.log(auth0User);
    }; 
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
      {isLoading && loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {!isLoading && !loading &&
        <div className='bodyContainer'>
          <Box className='formContainer'>
            <form className='form' onSubmit={navigation}>
              <Typography className='mainText'>
                Complete your profile with an image and username
              </Typography>
              <FileUploader
                style={{ width: '100%' }}
                onSelect={selectPic}
                maxSize={20}
                onSizeError={(file) => console.log(`${file} exceeds 20MB`)}
                multiple={false}
                children={<Button size='large' variant='contained'>choose a profile picture</Button>}
                types={fileTypes} />
              <TextField
                className='inputText'
                inputProps={{ maxLength: 20 }}
                onChange={selectUsername}
                label="Username"
                value={userName}
                variant="outlined"
                size='small'
                required
              />
              <Button
                size='large'
                type="submit"
                color='secondary'
                variant="contained"
                onClick={createUser}
              >
                finish profile
              </Button>
            </form>
          </Box>        
        </div>
      }
    </>
  );
};

export default ProfileCreation;