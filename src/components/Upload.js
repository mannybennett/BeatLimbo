import React, { useState } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {TextField, Button} from '@mui/material';

const Upload =(props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [title, setTitle] = useState('');
  
  const s3Client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_KEY,
      secretAccessKey: process.env.REACT_APP_S_KEY
    }
  });
  
  const uuid = uuidv4().slice(0, 8)
  
  const uploadObjectParams = (file) => {
    console.log(file)
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
  
  const postAudioFile = async (fileName, userId, title, userName) => {
    try {
      await axios.post('/api/audioFiles/upload', {
        file_name: fileName,
        user_id: userId,
        title: title,
        user_name: userName
      });
      console.log('Audio file posted successfully');
    } catch (error) {
      console.error('Error posting audio file:', error);
    }
  };

  const selectTitle = (e) => {
    setTitle(e.target.value)
  };
  
  const uploadFile = async (e) => {
    if (audioFile) {
      e.preventDefault()
      await uploadObject(audioFile);
      await postAudioFile(`${uuid}${audioFile.name}`, props.user.id, title, props.user.user_name);
    }
    // else...(notify user to complete form first)
  };

  const onSelect = async (file) => {
    setAudioFile(file)
  };

  const fileTypes = ["mp3"];

  return (
    <div className="App">
        <form>
          <FileUploader onSelect={onSelect} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
          <TextField onChange={selectTitle} label="Title" variant="outlined" required></TextField>
          <Button type="submit" onClick={uploadFile} variant="contained">Upload</Button>
        </form>
    </div>
  );
};

export default Upload;