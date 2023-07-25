import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import { Rating } from '@mui/material'
import './ProductCardFavourite.css'
const ProductCardFavourite = ({product}) => {
  
  const ratings=product.ratings;
    const options = {
        value:ratings,
        readOnly: true,
        precision: 0.5,
      };


      return (<Fragment>
        {
        <Fragment>
        <Link className='productCardFavourite' to={`/product/${product.productId}`}>
        <img src={product.image} alt={product.name}/>
        <p><b>{(product.name).substring(0,60)}</b></p>
        <div>
            <Rating {...options}/><span className='productCardFavouriteSpan'>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`Rs ${product.price}`}</span>
        </Link>
        </Fragment>
      }
      </Fragment>
      )
}

export default ProductCardFavourite