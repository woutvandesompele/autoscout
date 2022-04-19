import { ImageList, ImageListItem } from "@mui/material";

const PictureGrid = ({ pics }) => {
  return (<ImageList cols={3}>
    {pics.map(id => (
      <ImageListItem key={id}>
        <img src={`https://source.unsplash.com/${id}/100x100`} alt="" />
      </ImageListItem>
    ))}
  </ImageList>);
}



export default PictureGrid;