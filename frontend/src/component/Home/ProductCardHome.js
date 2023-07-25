import React from 'react'
import {Link} from 'react-router-dom'
import { Rating } from '@mui/material'
import './ProductCardHome.css'

const Product = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className='productCardHome' to={`/product/${product._id}`}>
    <img src={product.images[0].url} alt={product.name}/>
    <div className='productDetailsHome'>
    <p><b>{(product.name)}</b></p>
    <div>
        <Rating {...options}/>
        ({product.numOfReviews} Reviews)
    </div>
    <span>{`Rs ${product.price}`}</span>
    </div>
    </Link>
  )
}

export default Product
