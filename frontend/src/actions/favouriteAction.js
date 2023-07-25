import axios from "axios";
import { FAVOURITE_ITEM,REMOVE_FAVOURITE_ITEM } from "../constants/favouriteConstants";

// Add to favourite
export const addToFavourite=(id)=>async (dispatch,getState)=>{
    const { data } = await axios.get(
        `/api/v1/product/${id}`,
      );
      dispatch({ type: FAVOURITE_ITEM, payload: {
        productId:data.product._id,
        name:data.product.name,
        price:data.product.price,
        image:data.product.images[0].url,
        ratings:data.product.ratings,
        numOfReviews: data.product.reviews.length,
      }});
      localStorage.setItem("favourites",JSON.stringify(getState().favourite.favourites));
}

  // Remove from Cart
  export const removeItemsFromFavourite = (id) => async (dispatch,getState) =>{
    dispatch({
      type:REMOVE_FAVOURITE_ITEM,
      payload:id,
    });
    localStorage.setItem("favourites",JSON.stringify(getState().favourite.favourites));
  };