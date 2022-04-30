import { Button } from "@mui/material";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useMutation } from 'react-query';
import { makeStyles } from '@mui/styles';
import useFetch from "../hooks/useFetch.js";
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles({
  button: {
    "&:hover": {
      boxShadow: "none",
      background: "#FFE66B"
    },
    "&:active": {
      boxShadow: "none",
      background: "yellow"
    }
  }
});

const FavouriteButton = ({id, title, image}) => {

    const classes = useStyles();
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const personIdData = localStorage.getItem('id');
    const personId = parseInt(personIdData);
    
    const ids = { UserId: personId, RecipeId: id, Title: title, Image: image};
    
    //const {data: savedrecipes, isLoading, error } = useFetch(${backendUrl}/api/favourites?populate=*)

    const addToDatabase = (favourites) => {
      console.log(favourites);
      const savedRecipesIds = favourites.map(item => item.attributes.RecipeId)

        if (savedRecipesIds.includes(`${id}`)) {
          console.log("zit er al in")
        }else{ 
        console.log("zit er niet in")
          fetch(`${backendUrl}/api/favourites`, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: ids }),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            }); 
    }
    };

    const addFavourite = async () => {
      const api = await fetch(`${backendUrl}/api/favourites?populate=*&filters[UserId][$eq][0]=${personId}`)
      const filteredData = await api.json();
      console.log(filteredData.data);
        addToDatabase(filteredData.data);
    };

  return ( <>
    <Button className={classes.button} onClick={() => {addFavourite()}} sx={{bgcolor: "text.secondary", color: "primary.main", boxShadow: 1, p: ".1rem"}} size="small"><BookmarkBorderIcon/></Button> 
    </>);
}

export default FavouriteButton;