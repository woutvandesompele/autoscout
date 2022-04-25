import { Skeleton, Stack, Typography, CardMedia } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, data: cars } = useQuery(["cars", id], async () => {
    const data = await fetch(`http://localhost:1337/api/cars/${id}?populate=*`).then(r => r.json());
    console.log(JSON.stringify({data}, null, 2));
    return data;
  });

  console.log(cars);

  return (<Stack>
    {isLoading ? <Skeleton /> :     
    <CardMedia
      component="img"
      alt={cars.data.attributes.Cover.data.attributes.alternativeText}
      image={cars.data.attributes.Cover.data.attributes.formats.small.url}
    />}
    <Typography variant="h4" component="h2">{isLoading ? <Skeleton /> : `${cars.data.attributes.Make} ${cars.data.attributes.Model}`}</Typography>
    <Typography>{isLoading ? <Skeleton /> : `${cars.data.attributes.Mileage} Miles`}</Typography>
    <Typography>{isLoading ? <Skeleton /> : `First Registration: ${cars.data.attributes.Year}`}</Typography>
    {/* <Typography variant="caption">{isLoading ? <Skeleton /> : `Average rating: ${cars.data.attributes.rating} out of 5`}</Typography>
    {
      isLoading ? <Skeleton variant="rectangular" width={210} height={200} /> : cars.data.attributes.reviews.data.map(review => <Typography key={review.id}>{review.attributes.message}</Typography>)
    } */}

  </Stack>);
}

export default Detail;

// import { Card, CardContent, CardMedia, Typography, Link } from "@mui/material";
// import { useNavigate } from "react-router-dom"

// const CarCard = ({ cars }) => {
//   const navigate = useNavigate();
//   return (

//     <Card sx={{ maxWidth: 345 }} component={Link} to={`/detail/${cars.id}`}>
//       {cars.attributes.Cover.data &&
//         <CardMedia
//           component="img"
//           alt={cars.attributes.Cover.data.attributes.alternativeText}
//           height="140"
//           image={cars.attributes.Cover.data.attributes.formats.small.url}
//         />
//       }
//       <CardContent>
//         <Typography gutterBottom variant="h4" component="h2">
//           {cars.attributes.Make} {cars.attributes.Model}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {cars.attributes.Mileage} Miles
//         </Typography>
//       </CardContent>
//     </Card>
// );
// }

// export default CarCard;