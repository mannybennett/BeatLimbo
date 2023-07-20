import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Profile = (props) => {
  const [allVotes, setAllVotes] = useState([]);
  const [userFiles, setUserFiles] = useState([])

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        const response = await axios.get('/api/limbo/');
        return setAllVotes(response.data);
      } catch (error) {
        console.log('Error fetching votes:', error);
        throw error;
      }
    };

    getAllVotes()
  }, [])

  useEffect(() => {
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

  console.log(userVotes)
  console.log(userFiles)

  return (
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
                {/* FIGURE OUT HOW TO GET VOTE TOTALS FROM userVotes */}
                <StyledTableCell align="center">{}</StyledTableCell>
                <StyledTableCell align="center">{}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Profile;