import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
import { useNavigate, useHistory } from "react-router-dom"

const FavSearchCard = ({ search }) => {
  const navigate = useNavigate();
//   console.log(search.id)
//   console.log(search.attributes.Search)
  const url = search.attributes.Search
  const newUrl = url.replace("https://autoscout-react.herokuapp.com/results?", "");
  const newUrl2 = newUrl.replace("http://localhost:3000/results?", "");
  const newUrl3 = newUrl2.replace(/&/g, " - ");
  console.log(newUrl2);

  const handleClick = () => {
    navigate(`./${newUrl2}`, { replace: true });
  }

  return (
    <a href={url}>
      <Card sx={{ maxWidth: 340 }} >
        <CardContent>
            <Typography gutterBottom >
            {newUrl3}
            </Typography>
        </CardContent>
      </Card>
    </a>
);
}


export default FavSearchCard;