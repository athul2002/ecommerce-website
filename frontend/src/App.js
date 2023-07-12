import Header from "./component/layout/header/Header.js"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import './App.css';
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/product/ProductDetails.js";
import Products from './component/product/Products.js'
import Search from './component/product/Search.js'
function App() {
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
