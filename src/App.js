
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Discover from "./pages/Discover";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";
import SavedSearches from "./pages/Searches";
import Selling from "./pages/Selling";
import Detail from "./pages/Detail";


function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Discover />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="search" element={<Search />} />
        <Route path="selling" element={<Selling />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="searches" element={<SavedSearches />} />
      </Route>

    </Routes>

  );
}

export default App;
