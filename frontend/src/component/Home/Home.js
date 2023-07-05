import React, { Fragment } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from './Product.js'

const product={
    name:"Blue Tshirt",
    images:[{url:"https://images.bewakoof.com/t640/men-regular-fit-solid-t-shirt-580000-1685707457-1.jpg"}],
    price:"Rs 3000",
    _id:"abhishek",
}
const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>
    </Fragment>
  )
}

export default Home
