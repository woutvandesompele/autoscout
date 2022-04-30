import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from 'react-query';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const Input = styled('input')({
  display: 'none',
});

const AddCar = () => {
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
    }).then(r => r.json());
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

  return (
    <Stack spacing={4} sx={{ flex: 1 }} as="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        disabled={mutation.isLoading}
        id="Make"
        label="Make"
        required
        error={!!errors?.Make}
        helperText={errors?.Make?.message}
        {...register("Make", {
          required: 'Make is required'
        })} />
      <TextField
        disabled={mutation.isLoading}
        id="Model"
        label="Model"
        multiline
        required
        error={!!errors?.Model}
        helperText={errors?.Model?.message}
        {...register("Model", {
          required: 'Please add a model'
        })} />


    {/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel type="number" htmlFor="outlined-adornment-amount">Price up to</InputLabel>
          <OutlinedInput
            type="number"
            labelId="maxPrice"
            id="maxPrice"
            label="maxPrice"
            // value={maxPrice}
            // onChange={e => setMaxPrice(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
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
}

export default AddCar;