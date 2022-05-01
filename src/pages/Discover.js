// import { ImageList, ImageListItem, Link} from "@mui/material";
// import Button from '@mui/material/Button';
import MediaCard from '../components/MediaCard';
import Grid from "@mui/material/Grid";
import german from '../assets/img/german.jpg';
import suv from '../assets/img/suv.jpg';
import family from '../assets/img/family.jpg';
import electric from '../assets/img/electric.jpg';
import firstcar from '../assets/img/firstcar.jpg';
import trip from '../assets/img/trip.jpg';


const props = [
  {link:"?make=Mercedes-Benz", title:"Affordable german brands", img:german},
  {link:"?make=Volkswagen&model=Tiguan", title:"Exciting suv's", img:suv},
  {link:"?make=Ford&model=Focus", title:"Popular family cars", img:family},
  {link:"?make=Tesla", title:"Popular electric cars", img:electric},
  {link:"?price", title:"Your first car", img:firstcar},
  {link:"?make=Ford&model=Focus", title:"Cheap road trip cars", img:trip}
];

const Discover = () => {
  return (
    <>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {props.map(props => <Grid item xs={6} key={props.title}><MediaCard props={props}/></Grid>)}
    </Grid>
  </>);
};

export default Discover;



// const Discover = () => {
//   return (
//     <>
//     {props.map(props => <MediaCard props={props}/>)}
//   </>);
// }