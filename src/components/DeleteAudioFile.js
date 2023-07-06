import React from 'react'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import { Button } from '@mui/material';

const DeleteAudioFile =() => {
  
  const s3Client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_KEY,
      secretAccessKey: process.env.REACT_APP_S_KEY
    }
  });

  const deleteObject = async (key) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.REACT_APP_BUCKET,
        Key: key
      });
      const response = await s3Client.send(command);
      console.log('Object deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  const deleteAudioFile = async (id, key) => {
    try {
      await axios.delete(`/api/audioFiles/${id}`);
      console.log('Audio file deleted successfully');
      await deleteObject(key);
      console.log('Object deleted from S3 bucket');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Delete Audio File
        </p>
        <Button onClick={()=>deleteAudioFile(13, '95c7eb3akyoto.mp3')} variant="outlined">Delete</Button>
      </header>
    </div>
  );
}

export default DeleteAudioFile;