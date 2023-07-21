import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, CircularProgress, Backdrop } from "@mui/material";

const Profile = (props) => {
  const [allVotes, setAllVotes] = useState([]);
  const [userFiles, setUserFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        const response = await axios.get('/api/limbo/');
        setLoading(false)
        return setAllVotes(response.data);
      } catch (error) {
        console.log('Error fetching votes:', error);
        throw error;
      }
    };
    getAllVotes()
    const filteredFiles = props.audioFiles.filter(file => file.user_id === props.user.id)
    setUserFiles(filteredFiles)
  }, [])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main,
      border: 0,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.info.main, 
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.info.main,
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#1f1f1f',
      color: theme.palette.info.main,
    },
    '& td, & th': {
      border: 0,
    },
  }));

  const userVotes = allVotes.filter(vote => userFiles.some(file => file.id === vote.audio_file_id));

  const getVoteCounts = (userFiles, userVotes) => {
    // Initialize an object to store the vote counts for each audio file
    const voteCounts = userFiles.reduce((acc, file) => {
      acc[file.id] = { complete: 0, delete: 0 };
      return acc;
    }, {});
  
    // Calculate the vote counts from the userVotes array
    userVotes.forEach((vote) => {
      if (vote.vote === 'complete') {
        voteCounts[vote.audio_file_id].complete += 1;
      } else if (vote.vote === 'delete') {
        voteCounts[vote.audio_file_id].delete += 1;
      }
    });
    return voteCounts;
  };

  const voteCounts = getVoteCounts(userFiles, userVotes);

  // console.log(voteCounts)
  // console.log(userVotes)
  // console.log(userFiles)

  return (
    <>
      {loading && 
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      {!loading &&
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: "center" }}>
          <TableContainer component={Paper} sx={{ width: '90%', maxWidth: '900px', borderRadius: 0 }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Beats</StyledTableCell>
                  <StyledTableCell align="center">Complete</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userFiles.map((file, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell component="th" scope="row">{file.title}</StyledTableCell>
                    <StyledTableCell align="center">{voteCounts[file.id]?.complete || 0}</StyledTableCell>
                    <StyledTableCell align="center">{voteCounts[file.id]?.delete || 0}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      }
    </>
  )
}

export default Profile;