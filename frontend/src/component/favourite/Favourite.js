import React, { Fragment } from 'react';
import ProductCardFavourite from './ProductCardFavourite.js';
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux';
import './Favourite.css'
// import FavouriteIcon from "@mui/icons-material/Favorite.js"
import NoFavouriteIcon from "@mui/icons-material/HeartBroken.js"
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
const Favourite = () => {
  const {favourites}=useSelector((state)=>state.favourite);

  return (
    <Fragment>
      <MetaData title={`Favorites`}/>
      {favourites.length===0?(
          <div className="emptyFavorite">
            <NoFavouriteIcon />

            <Typography>No Favourite Products</Typography>
            <Link to="/products">View Products</Link>
          </div>):
          <Fragment>
            <div className="favouriteContainer">
          {            favourites && favourites.map(item=>(
            <div key={item.productId}>
                  <ProductCardFavourite key={item.productId} product={item}/>
            </div>
                
))}
            </div>
          </Fragment>

      }
    </Fragment>
  )
}

export default Favourite
