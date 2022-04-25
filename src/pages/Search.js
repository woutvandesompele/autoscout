import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
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
import { useQuery } from 'react-query';

const Search = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();
  const params = { make: make, model: model };
  let brands = [];

  brands = useQuery("brands", async () => {
    const where = encodeURIComponent(JSON.stringify({
          "Year": {
            "$gt": 2012
          }
    }));
    const data = await fetch(
          `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=50?keys=Make&order=Make&where=${where}`,
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
    console.log("changed to true")
    enable = true;
  } else {
    console.log("changed to false")
    enable = false;
  }

  const { data: models, isSuccess} = useQuery("models", async () => {
  console.log("Excecuted this code")
  const where = encodeURIComponent(JSON.stringify({
    "Make": "Audi",
    "Year": {
      "$gt": 2012
    }
  }));
  const data = await fetch(
    `https://parseapi.back4app.com/classes/Carmodels_Car_Model_List?limit=50&order=Model&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'qPjPSDpUMVQonypUKZINQyZc5UKSJVMarbokxtUS', // This is your app's application id
          'X-Parse-REST-API-Key': 'iV8tWZzLHBFNzYQtlMmdnPyaOYCDCCXFtI6soCCO', // This is your app's REST API key
        }
      }
      ).then(r => r.json());
      console.log("Excecuted this code")
      console.log(JSON.stringify({data}, null, 2));
  return data;
  }, {enabled: enable});

console.log(models)
  
  if (brands.data === undefined) {
    return <CircularProgress />
  }
  
  //  || typeof models.data.results === 'undefined'
  //  && models.data.results !== undefined
  
  const unique = [...new Set(brands.data.results.map(brand => brand.Make))];



  // if (typeof models.data !== 'undefined') {
  //   const unique2 = [...new Set(models.data.results.map(model => model.Model))];
  // }



  if (brands.data !== undefined) {
  return (
    <>
    {/* {isLoading && <CircularProgress />}
    {error && <Alert severity="error">Something went wrong</Alert>} */}
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Make</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Make"
          value={make}
          onChange={e => setMake(e.target.value)}
        >
          {unique.map((brand) => (
            <MenuItem value={brand}>{brand}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

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
          {/* {isSuccess ? 
            // const propertyValues = Object.values(person);
            unique2.map((model) => (
              <MenuItem value={model.Make}>{model.Make}</MenuItem>
            ))
          : */}
          <MenuItem value="R8">R8</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Grid container justifyContent="center">
      <Button variant="contained" color="secondary" sx={{ width: '80%' }}
      onClick={() => {
            navigate({
                pathname: '/results',
                search: `?${createSearchParams(params)}`,
                // `?make=${make}&model=${model}`,
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