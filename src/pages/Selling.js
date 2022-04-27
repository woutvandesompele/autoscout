import { Stack, Grid, Button } from "@mui/material";
import PictureGrid from "../components/PictureGrid";
import AddCar from '../components/AddCar';

const Selling = () => {
  const pics = [
    "WLUHO9A_xik",
    "B5iA2QoecH0",
    "vrh9r3o3NFs",
    "3gPDbjWHKkA",
    "QCrDUYKGbp4",
    "GIHwAOPPAAU",
    "DpgSywYaIVk",
    "LX_nAdJQpAQ",
    "f4Mco9WzRPM",
    "TvTOIfMeGI8",
    "ePrSuV_Rv5A"
  ];

  return (<Stack>
    {/* <img
      src={`https://source.unsplash.com/GGDWcJWyR7c/250x250`}
      alt=""
    /> */}
    {/* <PictureGrid pics={pics} /> */}
    <AddCar/>
    {/* <Grid container justifyContent="center">
      <Button variant="contained" color="secondary" sx={{ width: '80%' }}
      onClick={() => {
            
          }}
        >
        create
      </Button>
    </Grid> */}
  </Stack>);
}

export default Selling;