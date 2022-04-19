import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

const Detail = () => {
  const { id } = useParams();
  return (<Stack p={2}>
    <BackButton />
    <img src={`https://source.unsplash.com/${id}/250x250`} alt="" />
    <Stack component="section">
      <Typography variant="h2">Reactions</Typography>
      <Typography>Blah blah blah</Typography>
    </Stack>
  </Stack>);
}

export default Detail;