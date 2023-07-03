import React, {useState, useEffect} from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import ReactAudioPlayer from 'react-audio-player';

function App() {
  
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
      // file.name + user_id (for unique identifier)
      // OR file.name + file.lastModified (uglier but less steps)
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

  const getAudioUrl = (key) => `https://myfirstaudiobucket.s3.amazonaws.com/${key}`

  const url = getAudioUrl('testFile.mp3')

  const fileTypes = ["mp3"];

  const onSelect = (file) => {
    console.log(file);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
        {/* <FileUploader onSelect={(file) => uploadObject(file)} name="file" types={fileTypes} /> */}
        <FileUploader onSelect={onSelect} name="file" types={fileTypes} />
        <br></br>
        <ReactAudioPlayer src={url} controls />
      </header>
    </div>
  );
}

export default App;