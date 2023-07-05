import React, {useState, useEffect} from 'react'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import './App.css'

function App() {
  const [audioUrl, setAudioUrl] = useState('');
  const [allUrls, setAllUrls] = useState([]);
  
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
  
    useEffect(() => {
      //Needs to occur when Feed page is loaded
      const fetchFileNames = async () => {
        const fileData = await axios.get('/api/audioFiles');
        const fileArray = fileData.data.map(file => file.file_name);
        setAllUrls(fileArray);
      };
  
      fetchFileNames();
    }, []);
  
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
  
  const getAudioUrl = (key) => `https://myfirstaudiobucket.s3.amazonaws.com/${key}`
  
  const onSelect = async (file) => {
    await uploadObject(file);
    const url = getAudioUrl(`${uuid}${file.name}`);
    setAudioUrl(url);
    await postAudioFile(`${uuid}${file.name}`, 2);
  };

  const fileTypes = ["mp3"];
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
        <FileUploader onSelect={onSelect} maxSize={20} onSizeError={(file) => console.log(`${file} exceeds 20MB`)} name="file" types={fileTypes} />
        {console.log(allUrls)}
        <br></br>
        <ReactAudioPlayer src={audioUrl} controls />
        <br></br>
        <Button onClick={()=>deleteAudioFile(8, 'b1afbed0kyoto.mp3')} variant="outlined">Delete</Button>
      </header>
    </div>
  );
}

export default App;