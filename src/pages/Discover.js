import { ImageList, ImageListItem, Link} from "@mui/material";
import Button from '@mui/material/Button';


const Discover = () => {
  const pics = ["GtwiBmtJvaU", "W9OKrxBqiZA", "ki4UgfcJfnY"];
  return (
    <>
    <ImageList cols={1}>
      {pics.map(id => (
        <ImageListItem key={id} component={Link} to={`/detail/${id}`}>
          <img src={`https://source.unsplash.com/${id}/250x250`} alt="" />
        </ImageListItem>
      ))}
    </ImageList>
  </>);
}

export default Discover;