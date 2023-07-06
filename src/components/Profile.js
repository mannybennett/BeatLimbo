import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FileUploader } from "react-drag-drop-files";
import {TextField, Button} from '@mui/material';

const Profile = () => {
  const { user:auth0User, isAuthenticated, isLoading } = useAuth0();
  const [user, setUser] = useState(auth0User);
  const [userCreated, setUserCreated] = useState(false);
  // const [sqlUsers, setSqlUsers] = useState([]);
  const navigate = useNavigate()

  // useEffect(() => {
  //   const fetchSqlUsers = async () => {
  //     const userData = await axios.get('/api/users');
  //     const userArray = userData.data.map(user => {
  //       return {
  //         ...user
  //       }
  //     });
  //     setSqlUsers(userArray);
  //   };
    
  //   fetchSqlUsers();
  // }, []);

  // if (sqlUsers.find(sql => sql.email === user.email)) {
  //   setUserCreated(true)
  // };

  if (isLoading) {
    return <div>Loading ...</div>;
  };

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
      picture: file
    })
    uploadObject(file)
  };

  const selectUsername = (e) => {
    setUser({
      ...user,
      nickname: e.target.value
    })
  };

  const createUser = async () => {
    if (!userCreated) {
      // Create
      try {
        await axios.post('/api/users', {
          user_name: user.nickname,
          email: auth0User.email,
          profile_picture: `https://myfirstaudiobucket.s3.amazonaws.com/${user.picture}`
        });
        setUserCreated(true)
        console.log('User Created successfully');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } 
    // else {
    //   // Update (Not Sure If I Will Integrate)
    //   try {
    //     await axios.put('/api/users/:id', {
    //       user_name: user.nickname,
    //       profile_picture: `https://myfirstaudiobucket.s3.amazonaws.com/${user.picture}`
    //     });
    //     console.log('User Updated successfully');
    //   } catch (error) {
    //     console.error('Error updating user:', error);
    //   }
    // }
  };

  const fileTypes = ["jpg", "png", "jpeg"];

  const navigation = (e) => {
    e.preventDefault();
    // Create new component instead to welcome users that has link to feed component (limbo)
    navigate("/limbo");
  }

  return (
    isAuthenticated && (
      <div>
        <p>Select Profile Picture and Username</p>
        <form onSubmit={navigation}>
          <FileUploader onSelect={selectPic} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
          <br></br>
          <TextField onChange={selectUsername} label="Username" variant="outlined"></TextField>
          <Button type="submit" onClick={createUser} variant="contained">Submit</Button>
          <br></br>
          {/* <p>{auth0User.email}</p>
          <p>{user.email}</p> */}
        </form>
      </div>
    )
  );
};

export default Profile;