import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Discover from "./pages/Discover";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";
import Searches from "./pages/Searches";
import Selling from "./pages/Selling";
import Detail from "./pages/Detail";
import Results from "./pages/Results";
import LoginRedirect from "./pages/LoginRedirect";
import Login from "./pages/Login";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout/>} >
        <Route index element={<Login />} />
        <Route path="discover" element={<Discover />} />
        <Route path="search" element={<Search />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="results" element={<Results />} />
        <Route path="selling" element={<Selling />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="searches" element={<Searches />} />
        <Route exact path="/connect/:providerName/redirect" element={<LoginRedirect/>} />
      </Route>
    </Routes>

  );
}

export default App;
