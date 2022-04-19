import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const Search = () => {
  const [make, setMake] = React.useState('');

  const handleChange = (event) => {
    setMake(event.target.value);
  };

  return (
    <>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Make</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={make}
          label="Make"
          onChange={handleChange}
        >
          <MenuItem value={"Volkswagen"}>Volkswagen</MenuItem>
          <MenuItem value={"Mercedes"}>Mercedes</MenuItem>
          <MenuItem value={"BMW"}>BMW</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Grid container justifyContent="center">
      <Button variant="contained" color="secondary" sx={{ width: '80%' } }>
        Search
      </Button>
    </Grid>
    </>
  );
}

export default Search;







/*
import React from 'react';
import Select from 'react-select-nested';

const Search = () => {
      const fruit = [
          {
              val: 0,
              label: 'Apple'
          },
          {
              val: 1,
              label: 'Orange',
              items: [{parentVal: 1, val: 7, label: 'sub item 1'}, {parentVal: 1, val: 8, label: 'sub item 2'}]
          },
          {
              val: 2,
              label: 'Grape',
              items: [{parentVal: 2, val: 5, label: 'sub item 3'}, {parentVal: 2, val: 6, label: 'sub item 4'}]
          },
          {
              val: 3,
              label: 'Pomegranate',
              items: [{parentVal: 3, val: 9, label: 'sub item 5'}, {parentVal: 3, val: 10, label: 'sub item 6'}]
          },
          {
              val: 4,
              label: 'Strawberry',
          }
      ];
 
      return (
          <div>
              <Select
                  placeholder="Select fruit"
                  list={fruit}
                  onSelectChange={(item)=>console.log('use your custom handler here', item)}
              />
          </div>
      );
  };

export default Search;

*/