import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"
import empty  from '../assets/img/empty.jpg';

const CarCard = ({ cars }) => {
  const navigate = useNavigate();
  // const numberWithCommas = (x) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // }
  // const price = numberWithCommas(cars.attributes.Price)
  // console.log(cars)
  return (

    <Card sx={{ maxWidth: 345 }} component={Link} to={`/detail/${cars.id}`} underline="none">
      {cars.attributes.Cover.data ?
        <CardMedia
          component="img"
          alt={cars.attributes.Cover.data.attributes.alternativeText}
          height="140"
          image={cars.attributes.Cover.data.attributes.formats.small.url}
        /> :
        <CardMedia
          component="img"
          alt={empty}
          height="140"
          image={empty}
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {cars.attributes.Make} {cars.attributes.Model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          €{price}
        </Typography>
      </CardContent>
    </Card>
);
}

export default CarCard;