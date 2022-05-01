import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const MediaCard = (props) => {

    const image = props.props.img
    const title = props.props.title
  return (
  <Box key={title}>
    <Card 
    //       boxShadow: 3,
    //       width: '3rem',
    //       height: '5rem',
    //     //   bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
    //     //   color: (theme) =>
    //     //     theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    //       p: 10,
    //       m: 1,
    //       borderRadius: 2,
    //       textAlign: 'center',
    //       fontSize: '0.875rem',
    //       fontWeight: '700',  }} 
    component={Link} to={`/results${props.props.link}`}
    underline="none"
    // sx={    {    
    //       border: 10
    // } }
          >
      <CardMedia
        component="img"
        image={(image)}
        alt={props.props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.props.title}
        </Typography>
      </CardContent>
    </Card>
  </Box>
  );
}

export default MediaCard;