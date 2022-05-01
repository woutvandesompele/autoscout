import { Alert, CircularProgress, Container, Stack, Typography, Link, Button } from '@mui/material';
import { useQuery } from 'react-query';
import { useSearchParams, useNavigate } from "react-router-dom"
import queryString from "query-string"
import CarCard from '../components/CarCard';
import AddFavSearch from '../components/AddFavSearch';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Results() {
  const navigate = useNavigate();
  const queryParams = queryString.parse(window.location.search)
  let [searchParams, setSearchParams] = useSearchParams()
  const url = window.location.href;
  // console.log(url);
  const make = searchParams.get("make")
  const model = searchParams.get("model")
  const maxPrice = searchParams.get("maxPrice")
  const maxKm = searchParams.get("maxKm")
  const minYear = searchParams.get("minYear")
  const maxYear = searchParams.get("maxYear")
  let makeSearch;
  let modelSearch;
  let maxPriceSearch;
  let maxKmSearch;
  let minYearSearch;
  let maxYearSearch;
  // console.log(make)
  // console.log(model)
  // const qs = require('qs');
  // const query = qs.stringify({
  //   filters: {
  //     make: {
  //       $eq: make,
  //     },
  //     model: {
  //       $eq: model,
  //     },
  //   },
  // }, {
  //   encodeValuesOnly: true,
  // });

  if (make) {
    makeSearch = `filters[make][$eq]=${make}`;
  } else {makeSearch = "";}
  if (model) {
    modelSearch = `&filters[model][$eq]=${model}`;
  } else {modelSearch = "";}
  if (maxPrice) {
    maxPriceSearch = `&filters[price][$lt]=${maxPrice}`;
  } else {maxPriceSearch = "";}
  if (maxKm) {
    maxKmSearch = `&filters[mileage][$lt]=${maxKm}`;
  } else {maxKmSearch = "";}
  if (minYear) {
    minYearSearch = `&filters[year][$gt]=${minYear}`;
  } else {minYearSearch = "";}
  if (maxYear) {
    maxYearSearch = `&filters[year][$lte]=${maxYear}`;
  } else {maxYearSearch = "";}

  const { isLoading, error, data: cars } = useQuery(["cars", makeSearch, modelSearch, maxPriceSearch, maxKmSearch, minYearSearch, maxYearSearch], async () => {
    const data = await fetch(`${backendUrl}/api/cars?${makeSearch}${modelSearch}${maxPriceSearch}${maxKmSearch}${minYearSearch}${maxYearSearch}&populate=*`).then(r => r.json());
    return data;
  });
  console.log(cars);
  console.log(`${backendUrl}/api/cars?${makeSearch}${modelSearch}${maxPriceSearch}${maxKmSearch}${minYearSearch}${maxYearSearch}&populate=*`);

  return (
    <Container>
      <Typography variant="h2" component="h1">Results</Typography>
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Something went wrong</Alert>}
      <Button onClick={ () => navigate(-1) }><ArrowBackOutlinedIcon/></Button>
      <AddFavSearch url={window.location.href}/>
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