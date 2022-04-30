import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, CircularProgress, TextField, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as AdapterDateFns2 from "date-fns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import {
  createSearchParams,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';

const Search = () => {
  const queryClient = useQueryClient();
  const [maxKm, setMaxKm] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [minYear, setMinYear] = React.useState(new Date(Date.UTC(1900, 1, 1, 1, 0, 0, 0)));
  const [maxYear, setMaxYear] = React.useState(new Date());
  console.log(minYear.getFullYear());
  let unique2 = [];
  // const [models, setModels] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();
  const params = { make: make, model: model, maxPrice: maxPrice, maxKm: maxKm, minYear: minYear.getFullYear(), maxYear: maxYear.getFullYear() };
  let brands = [];
  // console.log(maxPrice);

  brands = useQuery("brands", async () => {
    const where = encodeURIComponent(JSON.stringify({
          "Year": {
            "$gt": 2012
          }
    }));
    const data = await fetch(
          `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=200?keys=Make&order=Make&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id': 'qPjPSDpUMVQonypUKZINQyZc5UKSJVMarbokxtUS', // This is your app's application id
              'X-Parse-REST-API-Key': 'iV8tWZzLHBFNzYQtlMmdnPyaOYCDCCXFtI6soCCO', // This is your app's REST API key
            }
          }
        ).then(r => r.json());
    return data;
  });

  let enable = false;
  if (make) {
    // console.log("changed to true")
    enable = true;
  } else {
    // console.log("changed to false")
    enable = false;
  }

  const { data: models, isSuccess, isLoading, error} = useQuery(["models", make], async () => {
  // console.log("Excecuted this code")
  const where = encodeURIComponent(JSON.stringify({
    "Make": make,
    "Year": {
      "$gt": 2012
    }
  }));
  const data = await fetch(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=200&order=Model&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'qPjPSDpUMVQonypUKZINQyZc5UKSJVMarbokxtUS', // This is your app's application id
          'X-Parse-REST-API-Key': 'iV8tWZzLHBFNzYQtlMmdnPyaOYCDCCXFtI6soCCO', // This is your app's REST API key
        }
      }
      ).then(r => r.json());
      // console.log("Excecuted this code")
      // console.log(JSON.stringify({data}, null, 2));
  return data;
  }, {enabled: enable});

  if (isSuccess) {
    unique2 = [...new Set(models.results.map(model => model.Model))];
    // console.log(unique2)
  }
  
  if (brands.data === undefined) {
    return <CircularProgress />
  }

  if (isLoading) return <CircularProgress />;
  
  const unique = [...new Set(brands.data.results.map(brand => brand.Make))];

  const handleMakeChange = e => {
    setMake(e.target.value)
    queryClient.invalidateQueries(["models", make])
  }

  if (brands.data !== undefined) {
  return (
    <>
    {isLoading && <CircularProgress />}
    {error && <Alert severity="error">Something went wrong</Alert>}
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Make</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Make"
          value={make}
          onChange={handleMakeChange}
        >
          {unique.map((brand) => (
            <MenuItem key={brand} value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* {console.log(models)} */}
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Model</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Model"
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          {isSuccess && unique2.map((model) => (
              <MenuItem key={model} value={model}>{model}</MenuItem>
            ))
          // <MenuItem value="R8">R8</MenuItem>
          }
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel type="number" id="demo-simple-select-label">Price up to</InputLabel>
        <Select
          labelId="demo-maxPrice-select-label"
          id="demo-maxPrice-select"
          label="maxPrice"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        >
          <MenuItem key="1000" value="1000">€1.000</MenuItem>
          <MenuItem key="2500" value="2500">€2.500</MenuItem>
          <MenuItem key="5000" value="5000">€5.000</MenuItem>
          <MenuItem key="10000" value="10000">€10.000</MenuItem>
          <MenuItem key="20000" value="20000">€20.000</MenuItem>
          <MenuItem key="30000" value="30000">€30.000</MenuItem>
          <MenuItem key="40000" value="40000">€40.000</MenuItem>
          <MenuItem key="50000" value="50000">€50.000</MenuItem>
          <MenuItem key="75000" value="75000">€75.000</MenuItem>
          <MenuItem key="100000" value="100000">€100.000</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel type="number" id="demo-simple-select-label">Miles up to</InputLabel>
        <Select
          labelId="demo-maxKm-select-label"
          id="demo-maxKm-select"
          label="maxKm"
          value={maxKm}
          onChange={e => setMaxKm(e.target.value)}
        >
          <MenuItem key="1000" value="1000">1.000</MenuItem>
          <MenuItem key="5000" value="5000">5.000</MenuItem>
          <MenuItem key="10000" value="10000">10.000</MenuItem>
          <MenuItem key="25000" value="25000">25.000</MenuItem>
          <MenuItem key="50000" value="50000">50.000</MenuItem>
          <MenuItem key="75000" value="75000">75.000</MenuItem>
          <MenuItem key="100000" value="100000">100.000</MenuItem>
          <MenuItem key="125000" value="125000">125.000</MenuItem>
          <MenuItem key="150000" value="150000">150.000</MenuItem>
          <MenuItem key="200000" value="200000">200.000</MenuItem>
        </Select>
      </FormControl>
    </Box>

  <Stack spacing={4} direction="row">
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year']}
            labelId="demo-minYear-select-label"
            id="demo-minYear-select"
            label="From"
            value={minYear}
            onChange={(minYear) => setMinYear(minYear)}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year']}
            labelId="demo-maxYear-select-label"
            id="demo-maxYear-select"
            label="To"
            value={maxYear}
            onChange={(maxYear) => setMaxYear(maxYear)}
            renderInput={(params) => <TextField {...params} helperText={null} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  </Stack>

    {/* <FormControl fullWidth sx={{ m: 1 }}> */}

    <Grid container justifyContent="center">
      <Button variant="contained" color="secondary" sx={{ width: '80%' }}
      onClick={() => {
            navigate({
                pathname: '/results',
                search: `?${createSearchParams(params)}`,
              });
          }}
        >
        Search
      </Button>
    </Grid>
    {/* <p>{brands}</p> */}
    </>




  );
}
}

export default Search;












//useEffect
// //useState -> state in state lik voorbeeld
// //invalidate queries
// //conditional rendering

/* }
{ {(() =>
  {
    <MenuItem value="A1">A1</MenuItem>
    <MenuItem value="A5">A5</MenuItem>
    <MenuItem value="Q5">Q5</MenuItem>
    <MenuItem value="R8">R8</MenuItem>
    if (make) {
      models.data.results.map((model) => (
        <MenuItem value={model}>{model}</MenuItem>
      ))
    }
  } }
  
  {switch (make) {
  case 'Volkswagen':
    return (
    <>
      <MenuItem value={"Golf"}>Golf</MenuItem>
      <MenuItem value={"Polo"}>Polo</MenuItem>
    </>
    )
  case 'BMW':
    return (
    <>
      <MenuItem value={"3 Reeks"}>3 Reeks</MenuItem>
    </>
    )
  default:
    console.log(`Sorry, we are out of luck.`);
  }
  }
)()}*/