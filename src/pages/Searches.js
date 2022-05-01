import { Alert, CircularProgress, Container, Stack, Typography, Link } from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from "react-router-dom"
import queryString from "query-string"
import FavSearchCard from '../components/FavSearchCard';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const userId = localStorage.getItem('userId');


function Searches() {

  const userId = localStorage.getItem('userId');
  // let [searchParams, setSearchParams] = useSearchParams()
  // const make = searchParams.get("make")
  // const model = searchParams.get("model")

  const { isLoading, error, isSuccess, data: searches } = useQuery(["searches", userId], async () => {
    const data = await fetch(`${backendUrl}/api/searches?filters[userId][$eq]=${userId}&populate=*`).then(r => r.json());
    return data;
  });
  // console.log(searches);

  return (
    <Container>
      <Typography variant="h2" component="h1">Searches</Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Stack spacing={4} direction="row">
        <Stack spacing={2} sx={{ flex: 1 }}>
          {searches && searches.data.map(search => <FavSearchCard key={search.id} search={search} component={Link} to={`/detail/${search.id}`}/>)}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Searches;


// onClick={()=>{navigate(`/detail/${cars.id}`)}
//component={Link} to={`/detail/${cars.id}`}