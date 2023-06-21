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

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.REACT_APP_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_KEY,
    secretAccessKey: process.env.REACT_APP_S_KEY
  }
});

const uploadObjectParams = {
  Bucket: process.env.REACT_APP_BUCKET,
  Key: 'test-object2.txt',
  Body: 'Hello, this is a 2nd test object!'
};

const uploadObject = async () => {
  try {
    const command = new PutObjectCommand(uploadObjectParams);
    const response = await s3Client.send(command);
    console.log('Object uploaded successfully:', response);
  } catch (error) {
    console.error('Error uploading object:', error);
  }
};

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Beat Limbo
        </p>
      </header>
    </div>
  );
}

export default App;