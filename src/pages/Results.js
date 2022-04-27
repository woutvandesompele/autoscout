import { Alert, CircularProgress, Container, Stack, Typography, Link } from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from "react-router-dom"
import queryString from "query-string"
import CarCard from '../components/CarCard';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Results() {

  // const history = useHistory();
  // function handleClick() {
  //   history.push(`/detail/${id}`);
  // }
  const navigate = useNavigate();
  const queryParams = queryString.parse(window.location.search)
  let [searchParams, setSearchParams] = useSearchParams()
  const make = searchParams.get("make")
  const model = searchParams.get("model")
  // console.log(make)
  // console.log(model)
                                                            //dit toevoegen
  const { isLoading, error, data: cars } = useQuery(["cars", make, model], async () => {
    const data = await fetch(`${backendUrl}/api/cars?filters[make][$eq]=${make}&filters[model][$eq]=${model}&populate=*`).then(r => r.json());
                                                //STRAPI REST API FILTER 
    return data;
  });
  console.log(cars);

  return (
    <Container>
      <Typography variant="h2" component="h1">Results</Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Stack spacing={4} direction="row">
        <Stack spacing={2} sx={{ flex: 1 }}>
          {cars && cars.data.map(cars => <CarCard key={cars.id} cars={cars} component={Link} to={`/detail/${cars.id}`}/>)}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Results;


// onClick={()=>{navigate(`/detail/${cars.id}`)}
//component={Link} to={`/detail/${cars.id}`}