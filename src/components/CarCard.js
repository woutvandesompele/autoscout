import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"

const CarCard = ({ cars }) => {
  const navigate = useNavigate();
  return (

    <Card sx={{ maxWidth: 345 }} component={Link} to={`/detail/${cars.id}`}>
      {cars.attributes.Cover.data &&
        <CardMedia
          component="img"
          alt={cars.attributes.Cover.data.attributes.alternativeText}
          height="140"
          image={cars.attributes.Cover.data.attributes.formats.small.url}
        />
      }
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {cars.attributes.Make} {cars.attributes.Model}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cars.attributes.Mileage} Miles
        </Typography>
      </CardContent>
    </Card>
);
}

export default CarCard;