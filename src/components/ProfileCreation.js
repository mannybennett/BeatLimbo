import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigation = async (e) => {
    e.preventDefault();
    await createUser();
    navigate("/limbo");
  }

  const getUser = async () => {
    if (!isLoading && auth0User) {
      await axios.get(`https://beatlimbo-backend.onrender.com/api/users/${auth0User.email}`)
      .then(res => {
        if (res.data.length) {
          navigate("/limbo")
        }
      })
    setLoading(false)
    }    
  };

  useEffect(() => {
    if (!isLoading && auth0User) {
      getUser();
    }; 
  }, [auth0User]);

  const selectPic = async (file) => {
    setUser({
      ...user,
      picture: file.name
    })
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('https://beatlimbo-backend.onrender.com/api/users/upload', formData);
  };

  const selectUsername = (e) => {
    setUser({
      ...user,
      nickname: e.target.value
    })
    setUserName(e.target.value)
  };

  const createUser = async () => {
    setLoading(true)
    if (userName) {
      try {
        await axios.post('https://beatlimbo-backend.onrender.com/api/users', {
          user_name: user.nickname,
          email: auth0User.email,
          profile_picture: user.picture ? `https://myfirstaudiobucket.s3.amazonaws.com/${user.picture}` : null
        });
        console.log('User Created successfully');
        setLoading(false)
      } catch (error) {
        console.error('Error creating user:', error);
        setLoading(false)
      }
    }
  };

  const fileTypes = ["jpg", "png", "jpeg", "heic"];

  const buttonStyle =
  {
    transition: 'background-color 0.3s !important',
    '&:hover': {
      backgroundColor: '#262626 !important'
    }
  }

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
                children={<Button sx={buttonStyle} size='large' variant='contained'>choose a profile picture</Button>}
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