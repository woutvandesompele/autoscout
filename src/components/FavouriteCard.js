import { Card, CardContent, Typography, Link } from "@mui/material";
// import { useNavigate } from "react-router-dom"

const FavouriteCard = ({ favorites }) => {
  // const navigate = useNavigate();
  return (

    <Card sx={{ maxWidth: 345 }} component={Link} to={`/detail/${favorites.attributes.carId}`}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {favorites.attributes.Make} {favorites.attributes.Model}
        </Typography>
      </CardContent>
    </Card>
);
}

export default FavouriteCard;