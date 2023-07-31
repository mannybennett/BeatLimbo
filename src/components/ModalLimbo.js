import React from "react";
import { Box, Modal, TextField, Button } from "@mui/material";

const ModalLimbo = ({ open, handleClose, sendComment, setNewComment, mobileView }) => {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: mobileView ? '50%' : '49.7%',
    transform: 'translate(-50%, -50%)',
    width: mobileView ? '90%' : '50%',
    maxWidth: '600px',
    bgcolor: '#e8e8e8',
    borderRadius: 1,
    boxShadow: 1,
    p: 2,
    textAlign: "center"
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      slotProps={{
        backdrop: {
          sx: {
            opacity: '0.3 !important',
            position: 'fixed !important',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }
        }
      }}
      >
      <Box sx={modalStyle}>
        <form onSubmit={sendComment} className='commentForm'>
          <TextField
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              marginBottom: 2,
              background: 'white',
              borderRadius: 1,
            }}
            inputProps={{ maxLength: 100 }}
            fullWidth={true}
            color='primary'
            label="Comment"
            variant="outlined"
            multiline
            required
            />
          <Button sx={{ width: '20%', fontFamily: 'Poppins', fontSize: '15px' }} type='submit' variant='contained'>POST</Button>
        </form>                  
      </Box>
    </Modal>
  )
};

export default ModalLimbo;