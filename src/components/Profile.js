import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAudioPlayer from 'react-audio-player';
import ModalProfile from "./ModalProfile";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Backdrop,
  Avatar,
  Typography,
  Button,
  useMediaQuery,
  Divider,
  Stack
} from "@mui/material";
import audioVisInvertedRed from '../images/audioVisInvertedRed.jpg';

const Profile = (props) => {
  const [allVotes, setAllVotes] = useState([]);
  const [userFiles, setUserFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const mobileView = useMediaQuery('(max-width: 400px)');
  const tabletView = useMediaQuery('(max-width: 735px)');
  const className = mobileView ? 'mobileAudioPlayer' : 'profileAudioPlayer'

  const handleOpen = () => setOpen(true);
  const handleNoClose = () => setOpen(false)
  const handleYesClose = async (id) => {
    setOpen(false)
    await props.deleteFile(id)
  }

  const getAudioFiles = async () => {
    await axios.get('/api/audioFiles/')
    .then(res => props.getFiles(res.data))
  }

  const getUserFiles = async () => {
    await getAudioFiles()
    const filteredFiles = await props.audioFiles.filter(file => file.user_id === props.user.id)
    setUserFiles(filteredFiles)
    setLoading(false)
  }

  useEffect(() => {
    const getAllVotes = async () => {
      try {
        const response = await axios.get('/api/limbo/');
        await getUserFiles()
        setAllVotes(response.data)
        return setLoading(false)
      } catch (error) {
        console.log('Error fetching votes:', error);
        throw error;
      }
    };
    getAllVotes()
  }, [props.audioFiles.length])

  const AvatarContainer = styled(Box)({
    position: 'relative',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '70px 0 30px 0'
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.info.main,
      border: 0,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.info.main,
      height: '54px' 
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

  const StyledTableBody = styled(TableBody)`
    display: block;
    height: 162px;
    overflow-y: scroll; 
`

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  const getVoteCounts = (userFiles, userVotes) => {
    const voteCounts = userFiles.reduce((acc, file) => {
      acc[file.id] = { complete: 0, delete: 0 };
      return acc;
    }, {});
  
    let totalCompletes = 0;
    let totalDeletes = 0;
  
    userVotes.forEach((vote) => {
      if (vote.vote === 'complete') {
        voteCounts[vote.audio_file_id].complete += 1;
        totalCompletes += 1;
      } else if (vote.vote === 'delete') {
        voteCounts[vote.audio_file_id].delete += 1;
        totalDeletes += 1;
      }
    });
  
    return { voteCounts, totalCompletes, totalDeletes };
  };  

  const userVotes = allVotes.filter(vote => userFiles.some(file => file.id === vote.audio_file_id));

  const { voteCounts, totalCompletes, totalDeletes } = getVoteCounts(userFiles, userVotes);

  const totalVotes = totalCompletes + totalDeletes;

  const completionPercentage = (totalCompletes / totalVotes) * 100 || 0;

  const totalPlays = userFiles.reduce((sum, file) => sum + (file.plays || 0), 0);

  // console.log('Vote Counts:', voteCounts)
  // console.log('Percentage:', completionPercentage)
  // console.log('User Votes:', userVotes)
  console.log('User Files:', userFiles)

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
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: "center", width: '100%' }}>
          <AvatarContainer>
            <Box sx={{ width: '100%', maxWidth: '900px', height: {xs: '75px', md: '110px'}, backgroundImage: `url(${audioVisInvertedRed})`, backgroundOrigin: 'border-box', backgroundPosition: '0% 85%', borderRadius: 1, boxShadow: "0px 3px 10px black" }}></Box>
            <Avatar sx={{ width: {xs: '150px', md: '200px'}, height: {xs: '150px', md: '200px'}, position: 'absolute', top: '-43px', boxShadow: "0px 0px 10px 1px black", borderRadius: 1 }} src={props.user.profile_picture} alt="User"/>
          </AvatarContainer>
          <Box width='90%' maxWidth='900px' display='flex' marginBottom='23px'>
            <Typography fontWeight={600} variant="h6">{props.user.user_name}</Typography>
          </Box>
          {/* Stats + Summary */}
          <Stack alignItems='center' maxWidth='900px' marginBottom='40px' width='90%' direction={tabletView ? 'column' : 'row'} spacing={5}>
            {/* Summary */}            
            <Box
              sx={{
                bgcolor: '#e8e8e8',
                width: tabletView ? '100%' : '48%',
                height: '100%',
                minHeight: '206px',
                borderRadius: 1,
                boxShadow: "0px 3px 10px black",
                display: 'flex',
                flexDirection: 'column',
                padding: 1.5,
                border: '5px solid #0F0F0F',
                alignItems: 'center'
              }}
            >
              <Typography marginBottom={2} fontSize='22px' fontWeight={600} color='#0F0F0F'>Account Summary</Typography>
              <Typography marginBottom={1} fontSize='18px' fontWeight={600} color='#424242'>
                <span style={{color: '#d91226'}}>{userFiles.length}</span> Tracks
              </Typography>
              <Divider sx={{ backgroundColor: '#0F0F0F', width: '90%', marginBottom: 1 }} variant="middle" />       
              <Typography marginBottom={1} fontSize='18px' fontWeight={600} color='#424242'>
                <span style={{color: '#d91226'}}>{totalPlays}</span> Plays
              </Typography>
              <Divider sx={{ backgroundColor: '#0F0F0F', width: '90%', marginBottom: 1 }} variant="middle" />
              <Typography marginBottom={1} fontSize='18px' fontWeight={600} color='#424242'>
                <span style={{color: '#d91226'}}>{completionPercentage.toFixed(0)}%</span> Positive Votes
              </Typography>       
            </Box>
            {/* Stats */}
            <TableContainer component={Paper} sx={{ width: tabletView ? '100%' : '48%', maxWidth: '900px', borderRadius: 1, bgcolor: 'black', boxShadow: "0px 3px 10px black" }}>
              <Table aria-label="customized table">
                <TableHead sx={{ width: '100%', backgroundColor: '#0F0F0F' }}>
                  <TableRow>
                    <StyledTableCell colSpan={4}>
                      <Typography align='center' color='#e8e8e8' fontSize='20px' fontWeight={500}>
                        Vote Stats
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell sx={{ width: '25%', padding: '0 16px 16px' }}>Title</StyledTableCell>
                    <StyledTableCell align='center' sx={{ width: '25%', padding: '0 16px 16px' }}>Plays</StyledTableCell>
                    <StyledTableCell align='center' sx={{ width: '25%', padding: '0 16px 16px' }}>Finish This</StyledTableCell>
                    <StyledTableCell align='center' sx={{ width: '25%', padding: '0 16px 16px' }}>Move On</StyledTableCell>
                  </TableRow>
                </TableHead> 
                <TableBody>
                  {userFiles.length ? (
                    userFiles.map((file, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell component="th" scope="row" sx={{ width: '25%' }}>{file.title}</StyledTableCell>
                      <StyledTableCell align='center' component="th" scope="row" sx={{ width: '25%' }}>{file.plays ? file.plays : 0}</StyledTableCell>
                      <StyledTableCell align='center' sx={{ width: '25%' }}>{voteCounts[file.id]?.complete || 0}</StyledTableCell>
                      <StyledTableCell align='center' sx={{ width: '25%' }}>{voteCounts[file.id]?.delete || 0}</StyledTableCell>
                    </StyledTableRow>
                    ))) : (
                    <StyledTableRow>
                      <StyledTableCell align='center' component="th" scope="row" colSpan={4}>No Uploads</StyledTableCell>
                    </StyledTableRow>
                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>        
          {/* Manage Uploads */}          
          <TableContainer component={Paper} sx={{ width: '90%', maxWidth: '900px', borderRadius: 1, bgcolor: 'black', boxShadow: "0px 3px 10px black", marginBottom: 2.5 }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ fontSize: '20px' }} colSpan={3} align="center">Manage Uploads</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userFiles.length ? (
                  userFiles.map((file, idx) => (
                    <StyledTableRow key={idx}>
                      <StyledTableCell component="th" scope="row" sx={{ width: '20%', padding: '0 0 0 16px' }}>
                        {file.title}
                        <Typography color='#919191' fontSize='12px'>{formatDate(file.created_at)}</Typography>
                      </StyledTableCell>
                      <StyledTableCell padding='none' align="center" sx={{ width: '60%', padding: '5px 10px 0 5px' }}>
                        <ReactAudioPlayer
                          className={className}
                          src={`https://myfirstaudiobucket.s3.amazonaws.com/${file.file_name}`}
                          controls
                          controlsList='nodownload noplaybackrate'
                        />
                      </StyledTableCell>
                      <StyledTableCell padding='none' align="right" sx={{ width: '20%', paddingRight: '10px' }}>
                        <Button onClick={handleOpen} color="secondary" variant='contained' size="small">delete</Button>
                      </StyledTableCell>
                      <ModalProfile setLoading={setLoading} handleYesClose={handleYesClose} handleNoClose={handleNoClose} open={open} title={file.title} id={file.id} fileName={file.file_name}/>
                    </StyledTableRow>
                  ))) : (
                    <StyledTableRow>
                      <StyledTableCell align='center' component="th" scope="row" colSpan={4}>No Uploads</StyledTableCell>
                    </StyledTableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      }
    </>
  )
}

export default Profile;