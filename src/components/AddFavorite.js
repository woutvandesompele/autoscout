import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
// const Input = styled('input')({
//   display: 'none',
// });

const AddFavorite = (carId) => {
  const [color, setColor] = useState("primary");
  const userId = localStorage.getItem('userId');
  
  const favoriteData = { userId: userId, carId: carId.carId };
  const carrId = { carId: carId.carId };
  // console.log(carId)
  // console.log(favoriteData);

  // const PosttFavorites = () => {
  //   console.log(data);
  // }
  
  const filter = async () => {
    const userFavourites = await fetch(`${backendUrl}/api/favorites?populate=*&filters[userId][$eq][0]=${userId}`).then(r => r.json());
    // console.log(userFavourites);
    const carsId = userFavourites.data.map(item => item.attributes.carId);
    // console.log(carsId);
    // console.log(carId.carId);
    
    // const testArray = [1, 2, 21, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    // const testnumber = 1;
    // if (testArray.includes(testnumber)) {  console.log(testArray + " contains " + testnumber) } else { console.log(testArray + " does not contain " + testnumber) }
    
    // if (carsId.includes(`${carId.carId}`)) {  console.log(carsId + " contains " + carId.carId) } else { console.log(carsId + " does not contain " + carId.carId) }
    
    if (carsId.includes(carId.carId)) {  console.log("is already favourited, deleting") 
    const userFavourites2 = await fetch(`${backendUrl}/api/favorites?populate=*&filters[userId][$eq][0]=${userId}&filters[carId][$eq]=${carId.carId}`).then(r => r.json());
    fetch(`${backendUrl}/api/favorites/${userFavourites2.data[0].id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
          },
          })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            }); 
    } else { console.log("is not favourited yet, adding") 
          fetch(`${backendUrl}/api/favorites`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify( { data: favoriteData } ),
          }).then(r => r.json());
          }
    };



  // const PostFavorites = async (data) => {
  //   return await fetch(`${backendUrl}/api/favourites`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(data),
  //   }).then(r => r.json());
  // }



  return (
    <Button onClick={() => {filter()}}><StarIcon color={color}/></Button>
  );
}

export default AddFavorite;