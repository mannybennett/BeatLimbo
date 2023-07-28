import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const tips = [
  { title: 'melody', link: 'https://www.izotope.com/en/learn/how-to-create-strong-melodies.html' },
  { title: 'drums', link: 'https://www.izotope.com/en/learn/live-drums-vs-sampled-drums-when-to-use-which.html' },
  { title: 'arrangement', link: 'https://www.izotope.com/en/learn/arranging-music-for-better-mixdown.html' },
  { title: 'mixing', link: 'https://www.izotope.com/en/learn/how-to-mix-music.html' },
  { title: 'sound selection', link: 'https://stickz.co/blog/sound-selection-secrets/' },
  { title: 'tempo', link: 'https://www.izotope.com/en/learn/using-different-tempos-to-make-beats-for-different-genres.html' },
  { title: 'effects', link: 'https://www.izotope.com/en/learn/guide-to-audio-effects.html' },
  { title: 'transitions', link: 'https://www.izotope.com/en/learn/how-to-create-better-transitions-in-your-mix.html' },
  { title: 'bassline', link: 'https://www.izotope.com/en/learn/how-to-get-a-fat-deep-bass-sound.html' },
];

const GeneralTips = () => {
  return (
    <Box
      sx={{
        bgcolor: '#1f1f1f',
        width: '100%',
        height: 'auto',
        borderRadius: 1,
        boxShadow: "0px 3px 10px black",
        display: 'flex',
        flexDirection: 'column',
        padding: 2
      }}
    >
      <Typography marginBottom={1} variant='h5' fontWeight='500' color='#e8e8e8'>General Tips</Typography>
      <Typography marginBottom={2} variant='subtitle1' color='#919191'>To achieve quality beats, keep the following components in mind and click to learn more:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {tips.map((tip, idx) => {
          return (
            <Chip
              key={idx}
              component="a"
              href={tip.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                margin: '0 4px 4px 0',
                transform: 'translateY(0)',
                transition: 'transform 0.25s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
              clickable
              color='secondary'
              label={tip.title}
            />
          )
        })}
      </Box>
    </Box>
  )
};

export default GeneralTips;