// V2
// import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_KEY,
//   secretAccessKey: process.env.REACT_APP_S_KEY,
//   region: process.env.REACT_APP_REGION
// });

// const s3 = new AWS.S3();

// const uploadObjectParams = {
//   Bucket: process.env.REACT_APP_BUCKET,
//   Key: 'test-object.txt',
//   Body: 'Hello, this is a test object!'
// };

// s3.putObject(uploadObjectParams, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('Object uploaded successfully:', data);
//   }
// });
// -------------

// *V3*

import React, {useState} from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";

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

function App() {

  const fileTypes = ["mp3"];

  const [file, setFile] = useState(null);
  const onSelect = (file) => {
    console.log(file);
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
        <FileUploader onSelect={(file) => uploadObject(file)} name="file" types={fileTypes} />
      </header>
    </div>
  );
}

export default App;