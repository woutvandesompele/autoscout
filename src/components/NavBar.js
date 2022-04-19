
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';

const NavBar = () => {
  return (<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} >
    <BottomNavigation
      showLabels
      width="xs"
    >
      <BottomNavigationAction label="Discover" to="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" to="/search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Favourites" to="/favourites" icon={<StarBorderIcon />} />
      <BottomNavigationAction label="Saved Searches" to="/searches" icon={<SavedSearchIcon />} />
      <BottomNavigationAction label="Selling" to="/selling" icon={<BorderColorIcon />} />
    </BottomNavigation>
  </Paper>);
}

export default NavBar;