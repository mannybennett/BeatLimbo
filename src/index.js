import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// -----------------------------------------------------------------------

// const express = require("express");
// require("dotenv").config();
// const fs = require('fs');
// const AWS = require('aws-sdk');
// const app = express();
// const port = process.env.PORT || 4001;
// // const usersRouter = require('./routers/users');

// app.use(express.json());
// // app.use('/users', usersRouter)

// // **********************

// AWS.config.update({
//   accessKeyId: process.env.KEY,
//   secretAccessKey: process.env.S_KEY
// });

// const s3 = new AWS.S3({params: {Bucket: process.env.BUCKET}});

// const filePath = '<file-path>';

// const uploadParams = {
//   Bucket: process.env.BUCKET,
//   Key: process.env.KEY,
//   Body: fs.createReadStream(filePath)
// };

// const downloadParams = {
//   Bucket: process.env.BUCKET,
//   Key: process.env.KEY,
// };

// s3.upload(uploadParams, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(`File uploaded successfully. ${data.Location}`);
//   }
// });

// s3.getObject(downloadParams, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(`File downloaded successfully. ${data.Body.toString()}`);
//   }
// });

// // **********************

// app.listen(port, () => {
//  console.log(`Web server is listening on port ${port}!`);
// });