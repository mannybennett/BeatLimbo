import React, {useState} from "react";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { FileUploader } from "react-drag-drop-files";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Profile = () => {
  const { user:auth0User, isAuthenticated, isLoading } = useAuth0();
  const [user, setUser] = useState(auth0User);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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
  }

  const createUser = async () => {
    try {
      await axios.post('/api/users', {
        user_name: user.nickname,
        profile_picture: `https://myfirstaudiobucket.s3.amazonaws.com/${user.picture}`
      });
      console.log('User Created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const fileTypes = ["jpg", "png", "jpeg"]

  return (
    isAuthenticated && (
      <div>
        <p>Select Profile Picture and Username</p>
        <FileUploader onSelect={selectPic} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
        <br></br>
        <TextField onChange={selectUsername} label="Username" variant="outlined"></TextField>
        <Button onClick={createUser} variant="contained">Submit</Button>
      </div>
    )
  );
};

export default Profile;