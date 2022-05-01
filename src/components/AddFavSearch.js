import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
// const Input = styled('input')({
//   display: 'none',
// });

const AddFavorite = (url) => {
//   const [color, setColor] = useState("primary");
  const userId = localStorage.getItem('userId');
  
  const favSearchData = { Search: url.url, userId: userId };
  
  const filter = async () => {
    const userFavSearches = await fetch(`${backendUrl}/api/searches?populate=*&filters[userId][$eq][0]=${userId}`).then(r => r.json());
    const userURLs = userFavSearches.data.map(item => item.attributes.Search);
    console.log(userURLs);
    console.log(url.url);
    
    if (userURLs.includes(url.url)) {  console.log("is already favourited") 
    // const userFavSearches2 = await fetch(`${backendUrl}/api/searches?populate=*&filters[userId][$eq][0]=${userId}&filters[search][$eq]=${url.url}`).then(r => r.json());
    // console.log(`${backendUrl}/api/searches?populate=*&filters[userId][$eq][0]=${userId}&filters[search][$eq]=${url.url}`);
    // console.log(userFavSearches2);
    // fetch(`${backendUrl}/api/searches/${userFavSearches2.data[0].id}`, {
    //       method: "DELETE",
    //       headers: {
    //           "Content-Type": "application/json",
    //       },
    //       })
    //         .then(response => response.json())
    //         .then(data => {
    //         console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //         console.error('Error:', error);
    //         }); 
    } else { console.log("is not favourited yet, adding");
          fetch(`${backendUrl}/api/searches`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify( { data: favSearchData } ),
          }).then(r => r.json());
          }
    };


  return (
    <Button onClick={() => {filter()}}>Save Search</Button>
  );
}

export default AddFavorite;