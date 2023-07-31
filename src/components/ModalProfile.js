import React from "react";
import axios from "axios";
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Box, Modal, Button, Typography, useMediaQuery } from "@mui/material";

const ModalProfile = ({ open, handleYesClose, handleNoClose, title, id, fileName, setLoading }) => {
  const mobileView = useMediaQuery('(max-width: 900px)');

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

  const deleteAudioFile = async (id) => {
    try {
      await axios.delete(`/api/profile/audioFiles/${id}`);
      console.log('Audio file deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };  

  const deleteComments = async (audioFileId) => {
    try {
      await axios.delete(`/api/profile/comments/${audioFileId}`);
      console.log('Comments deleted successfully');   
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const deleteVotes = async (audioFileId) => {
    try {
      await axios.delete(`/api/profile/votes/${audioFileId}`);
      console.log('Votes deleted successfully');   
    } catch (error) {
      console.error('Error deleting votes:', error);
    }
  };

  const deleteVCAF = async (id, key) => {
    setLoading(true)
    try {
      await deleteVotes(id)
      await deleteComments(id)
      await deleteObject(key)
      await deleteAudioFile(id)
      await handleYesClose(id)
      console.log('Delete process complete')
    } catch (error) {
      handleYesClose(id)
      console.log('Error during delete process')
    }
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: mobileView ? '50%' : '49.7%',
    transform: 'translate(-47.3%, -50%)',
    width: 'auto',
    maxWidth: '300px',
    minWidth: '186px',
    bgcolor: '#e8e8e8',
    borderRadius: 1,
    boxShadow: 1,
    p: 1,
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <Modal
      open={open}
      onClose={handleNoClose}
      aria-labelledby="modal-modal-title"
      >
      <Box sx={modalStyle}>
        <Typography fontWeight={600} marginBottom={2} variant='h6'>Are you sure you want to <span style={{color: '#d91226'}}>delete</span> "{title}"?</Typography>
        <Box width='100%' display='flex'>
          <Button sx={{ marginRight: '4px' }} fullWidth onClick={() => deleteVCAF(id, fileName)} variant='contained'>yes</Button>
          <Button sx={{ marginLeft: '4px' }} fullWidth onClick={handleNoClose} variant='contained'>no</Button>
        </Box>                  
      </Box>
    </Modal>
  )
};

export default ModalProfile;