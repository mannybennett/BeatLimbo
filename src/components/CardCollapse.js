import React from "react";
import { Collapse, Divider, CardContent, Box, Avatar, Typography, IconButton } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';

const CardCollapse = (props) => {
  const {
    user,
    isExpanded,
    comments,
    deleteComment,
    handleOpen,
    expandedId
  } = props;

  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Divider sx={{ backgroundColor: '#3d3d3d' }} variant="middle" />
        <CardContent>
          {comments.some(comment => expandedId === comment.audio_file_id) ? (
            comments.map((comment, idx) => {
              if (expandedId === comment.audio_file_id) {
                return (
                  <Box sx={{ marginBottom: 1 }} key={idx}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} alt='' src={comment.profile_picture} />
                      <Typography                            
                        variant="p"
                        color="#919191"                                  
                        >
                        {comment.user_name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ paddingLeft: '32px' }} color="#e8e8e8" fontSize='15.5px'>
                        {comment.comment}
                      </Typography>
                      {comment.user_id === user.id &&
                      <IconButton sx={{ padding: 0 }} onClick={() => deleteComment(comment.id)}>
                        <DeleteIcon sx={{ fill: '#3d3d3d' }} fontSize='small' />
                      </IconButton>
                      }                            
                    </Box>                    
                  </Box> 
                )
              } return null
            })) : isExpanded ? (
              <Typography color="#919191" variant="subtitle1">
                <em>Be the first to comment!</em>
              </Typography>
            ) : null
          }                                 
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleOpen}>
            <AddBoxIcon className='addIcon' fontSize='large' />
          </IconButton>
        </Box>                
      </Collapse>
  );
};

export default CardCollapse;