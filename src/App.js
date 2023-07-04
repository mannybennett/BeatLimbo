import React, {useState, useEffect} from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

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
  
  
  const uploadObjectParams = (file) => {
    return {
      Bucket: process.env.REACT_APP_BUCKET,
      // file.name + user_id (for unique identifier) note: will have to restrict duplicates
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
  
    useEffect(() => {
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
  
  const getAudioUrl = (key) => `https://myfirstaudiobucket.s3.amazonaws.com/${key}`
  
  const onSelect = async (file) => {
    await uploadObject(file);
    const url = getAudioUrl(file.name);
    setAudioUrl(url);
    await postAudioFile(file.name, 3);
  };

  const fileTypes = ["mp3"];
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
        <FileUploader onSelect={onSelect} name="file" types={fileTypes} />
        {console.log(allUrls)}
        <br></br>
        <ReactAudioPlayer src={audioUrl} controls />
      </header>
    </div>
  );
}

export default App;