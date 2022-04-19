import { Stack } from "@mui/material";
import PictureGrid from "../components/PictureGrid";

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
    <img
      src={`https://source.unsplash.com/GGDWcJWyR7c/250x250`}
      alt=""
    />
    <PictureGrid pics={pics} />
  </Stack>);
}

export default Selling;