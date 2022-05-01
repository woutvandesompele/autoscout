
import { Alert, CircularProgress, Container, Stack, Typography, Link } from '@mui/material';
import { useQuery } from 'react-query';
// import { useSearchParams, useNavigate } from "react-router-dom"
// import queryString from "query-string"
import CarCard from '../components/CarCard';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Favourites() {

  let carIds;
  let query = "";
  const userId = localStorage.getItem('userId');
  // let [searchParams, setSearchParams] = useSearchParams()
  // const make = searchParams.get("make")
  // const model = searchParams.get("model")

  const { isLoading, error, isSuccess, data: favorites } = useQuery(["favorites", userId], async () => {
    const data = await fetch(`${backendUrl}/api/favorites?filters[userId][$eq]=${userId}&populate=*`).then(r => r.json());
    return data;
  });
  
  if (isSuccess) {
    carIds = favorites.data.map(favorite => favorite.attributes.carId);
    let [a, b, c] = carIds
    // carIdsNumber = parseInt(carIds);
    console.log(carIds);

    const qs = require('qs');
    query = qs.stringify({
      filters: {
        id: {
          $in: carIds,
        },
      },
    }, {
      encodeValuesOnly: true,
    });
  console.log(query);  
}

  const { data: cars } = useQuery(["cars", carIds], async () => {
    const data = await fetch(`${backendUrl}/api/cars?${query}&populate=*`).then(r => r.json());
    return data;
  });
  console.log(cars)
//   function isEmpty(cars) {
//     return Object.keys(cars).length === 0;
// }

  return (
    <Container>
      <Typography variant="h2" component="h1">Favourites</Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      {cars && <Stack spacing={4} direction="row">
        <Stack spacing={2} sx={{ flex: 1 }}>
          {cars && cars.data.map(cars => <CarCard key={cars.id} cars={cars} component={Link} to={`/detail/${cars.id}`}/>)}
        </Stack>
      </Stack>}
    </Container>
  );
}

export default Favourites;

