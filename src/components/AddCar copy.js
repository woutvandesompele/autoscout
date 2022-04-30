import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { Alert, Button, Snackbar, Stack, TextField, Typography, Box, InputLabel, MenuItem, FormControl, Select, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Input = styled('input')({
  display: 'none',
});

const AddCar = () => {

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  let brands = [];
  let unique2 = [];

  const { handleSubmit, formState: { errors }, register, reset, watch } = useForm();

  const queryClient = useQueryClient();

  const postCar = async (data) => {
    const formData = new FormData();
    console.log(data);
    if (data.image.length > 0) {
      formData.append("files.cover", data.image[0], data.image[0].name);
    }
    const postData = { ...data }
    delete postData.image;
    formData.append("data", JSON.stringify(postData));

    return await fetch(`${backendUrl}/api/cars`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data"
      },
      body: formData,
    }).then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    }); ;
  }

  const mutation = useMutation(postCar, {
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries('cars');
      reset()
    },
  })

  const onSubmit = data => {
    console.log(data)
    mutation.mutate(data)
  }

  const handleCloseSnackbar = () => {
    mutation.reset();
  }

  // const [Year, setYear] = React.useState(new Date());
  // const min = 0;
  // const max = 100;
  // const [value, setValue] = useState(20);

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
    <Stack spacing={4} sx={{ flex: 1 }} as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      
      {/* <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Make</InputLabel>
          <Select
            disabled={mutation.isLoading}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Make"
            required
            error={!!errors?.Make}
            {...register("Model", {
              // required: 'Model is required'
            })}
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
      {/* <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Model</InputLabel>
          <Select
            disabled={mutation.isLoading}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Model"
            required
            error={!!errors?.Model}
            {...register("Model", {
              // required: 'Model is required'
            })}
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
      </Box> */}

      <TextField
        disabled={mutation.isLoading}
        type="number"
        id="Price"
        label="Price"
        required
        error={!!errors?.Price}
        helperText={errors?.Price?.message}
        {...register("Price", {
          required: 'Please add a price'
        })} />

      <TextField
        disabled={mutation.isLoading}
        type="number"
        id="Mileage"
        label="Mileage"
        required
        error={!!errors?.Mileage}
        helperText={errors?.Mileage?.message}
        {...register("Mileage", {
          required: 'Please add mileage'
        })} />

      <TextField
        disabled={mutation.isLoading}
        InputProps={{inputProps: { type: "number", max: 2022, min: 1900 }}}
        id="First Registration"
        label="Year"
        // value={value}
        // onChange={(e) => {
        //   var value = parseInt(e.target.value, 10);

        //   if (value > max) value = max;
        //   if (value < min) value = min;

        //   setValue(value);
        // }}
        // required
        error={!!errors?.Year}
        helperText={errors?.Year?.message}
        {...register("Year", {
          // required: 'Please fill in the first registration'
        })} />






{/* 
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year']}
            labelId="demo-minYear-select-label"
            value={Year}
            disabled={mutation.isLoading}
            id="Year"
            label="First Registration"
            required
            error={!!errors?.Year}
            onChange={(Year) => setYear(Year)}
            renderInput={(params) => <TextField {...params} helperText={null}/>}
            // helperText={errors?.Year?.message}
            {...register("Year", {
              required: 'Please fill in the first registration'
            })} 
          />
        </LocalizationProvider>
      </FormControl>
    </Box> */}

      <Stack direction="row" spacing={2} alignItems="center">
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file"  {...register("image")} />
          <Button variant="contained" component="span" disabled={mutation.isLoading}>
            Select photo
          </Button>
        </label>
        <Typography>{watch("image") && watch("image").length > 0 && watch("image")[0].name}</Typography>
      </Stack>
      <LoadingButton loading={mutation.isLoading}
        loadingIndicator="Adding car" type="submit" variant="contained">Add car</LoadingButton>

      <Snackbar open={mutation.isSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Car added
        </Alert>
      </Snackbar>
    </Stack>
  );
}}

export default AddCar;