import React, {useState, useEffect} from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Upload =(props) => {
  // do I actually have user?
  // userCreated not working from Profile.js
  const [audioUrl, setAudioUrl] = useState('');
  const [sqlUsers, setSqlUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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
  
  const s3Client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_KEY,
      secretAccessKey: process.env.REACT_APP_S_KEY
    }
  });
  
  const uuid = uuidv4().slice(0, 8)
  
  const uploadObjectParams = (file) => {
    return {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: `${uuid}${file.name}`,
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
  
  const postAudioFile = async (fileName, userId) => {
    try {
      await axios.post('/api/audioFiles/upload', {
        file_name: fileName,
        user_id: userId
      });
      console.log('Audio file posted successfully');
    } catch (error) {
      console.error('Error posting audio file:', error);
    }
  };
  
  const getAudioUrl = (key) => `https://myfirstaudiobucket.s3.amazonaws.com/${key}`
  
  const onSelect = async (file) => {
      // where is the right place for setCurrentUser? useEffect?
      // setCurrentUser(sqlUsers.find(sql => sql.email === user.email));
      console.log(currentUser);
      await uploadObject(file);
      const url = getAudioUrl(`${uuid}${file.name}`);
      setAudioUrl(url);
      await postAudioFile(`${uuid}${file.name}`, props.user.id);
    // if (userCreated) {
    //   setCurrentUser(sqlUsers.find(sql => sql.email === user.email));
    //   console.log(currentUser);
    //   await uploadObject(file);
    //   const url = getAudioUrl(`${uuid}${file.name}`);
    //   setAudioUrl(url);
    //   await postAudioFile(`${uuid}${file.name}`, currentUser.id);
    // }
  };

  const fileTypes = ["mp3"];

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
        <FileUploader onSelect={onSelect} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
        {console.log(sqlUsers)}
        <br></br>
        <ReactAudioPlayer src={audioUrl} controls />
      </header>
    </div>
  );
}

export default Upload;