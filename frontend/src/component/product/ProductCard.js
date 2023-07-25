import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from '@mui/material'
import './ProductCard.css'

const Product = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name}/>
    <p><b>{(product.name).substring(0,60)}</b></p>
    <div>
        <Rating {...options}/><span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
    </div>
    <span>{`Rs ${product.price}`}</span>
    </Link>
  )
}

export default Product