import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {TextField, Button, Modal, Typography, Box, Snackbar, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Upload =(props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleOpenSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const action = (
    <Box display='flex' alignItems='center'>
      <Link to='/limbo'>
        <Typography marginRight='2px' color='#d91226' fontWeight={600} fontSize='0.875rem'>SEE POST</Typography>
      </Link>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultImg = "https://myfirstaudiobucket.s3.amazonaws.com/speaker.jpg"

  const fileTypes = ["mp3", "wav"];

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    maxWidth: '300px',
    minWidth: '186px',
    bgcolor: '#e8e8e8',
    borderRadius: 1,
    boxShadow: 1,
    p: 1,
    textAlign: "center"
  };
  
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
  
  const postAudioFile = async (fileName, userId, title, userName, image) => {
    try {
      await axios.post('/api/audioFiles/upload', {
        file_name: fileName,
        user_id: userId,
        title: title,
        user_name: userName,
        image: image
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
    if (audioFile && title) {
      e.preventDefault()
      setTitle('')
      setAudioFile(null)
      handleOpenSnack()
      await uploadObject(audioFile);
      await postAudioFile(`${uuid}${audioFile.name}`, props.user.id, title, props.user.user_name, props.user.profile_picture ? props.user.profile_picture : defaultImg);
    } else {
      e.preventDefault()
      handleOpen()
    }
  };

  const onSelect = async (file) => {
    setAudioFile(file)
    console.log(file)
  };

  console.log(title)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }} className="App">
      <Box width='90%' height='90%' maxWidth='600px' maxHeight='500px' display='flex' justifyContent='center'>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={uploadFile}>
          <Typography align='center' sx={{ marginBottom: '50px' }} fontSize='2rem' fontWeight={500}>Select a file and title for your track</Typography>          
          <Typography color='#919191' variant='subtitle2'>{audioFile && audioFile.name}</Typography>
          <FileUploader
            style={{ width: '100%' }}
            onSelect={onSelect}
            maxSize={20}
            onSizeError={(file) => console.log(`${file} exceeds 20MB`)}
            multiple={false}
            children={<Button size='large' variant='contained'>choose an MP3 or WAV file</Button>}
            types={fileTypes}
          />
          <TextField sx={{ width: '261.75px', marginBottom: '20px', marginTop: '20px' }} inputProps={{ maxLength: 20 }} onChange={selectTitle} label="Title" value={title} variant="outlined" size='small' required />
          <Button size='large' type="submit" color='secondary' variant="contained">submit</Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={modalStyle}>
              <WarningAmberIcon sx={{ fontSize: 40, color: "#d91226" }} />
              <Typography fontWeight={600} variant="h6">
                Please select an audio file and title
              </Typography>
            </Box>
          </Modal>
          <Snackbar         
            open={openSnack}
            autoHideDuration={30000}
            onClose={handleCloseSnack}
            message="Upload Complete"
            action={action}
          />
        </form>
      </Box>        
    </div>
  );
};

export default Upload;