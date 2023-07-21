import Header from "./component/layout/header/Header.js"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import './App.css';
import WebFont from "webfontloader"
import React, { useState } from "react";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/product/ProductDetails.js";
import Products from './component/product/Products.js'
import Search from './component/product/Search.js'
import LoginSignUp from "./component/user/LoginSignUp.js";
import Profile from "./component/user/Profile.js";
import Store from './Store'
import { loadUser } from './actions/userActions.js'
import UserOptions from './component/layout/header/UserOptions.js'
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/route/ProtectedRoute.js";
import UpdateProfile from './component/user/UpdateProfile.js'
import UpdatePassword from './component/user/UpdatePassword.js'
import ForgotPassword from './component/user/ForgotPassword.js'
import ResetPassword from './component/user/ResetPassword.js'
import Cart from './component/cart/Cart.js'
import Shipping from './component/cart/Shipping.js'
import ConfirmOrder from './component/cart/ConfirmOrder.js'
import axios from 'axios'
import Payment from './component/cart/Payment.js'
import OrderSuccess from './component/cart/OrderSuccess.js'
import MyOrders from './component/order/MyOrders.js'
import OrderDetails from './component/order/OrderDetails.js'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./component/admin/Dashboard.js"
function App() {
  const {isAuthenticated, user}=useSelector((state)=>state.user);
  const[stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"],
      },
    });
    Store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}

      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/product/:id" element={<ProductDetails/>}/>
        <Route exact path="/products" element={<Products/>}/>
        <Route exact path="/products/:keyword" element={<Products/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route exact path="/login" element={<LoginSignUp/>}/>
        <Route
        exact
            path="/process/payment"
            element={stripeApiKey&&
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute >
                <Payment />
              </ProtectedRoute>
              </Elements>
            }
          />
        <Route
        exact
            path="/account"
            element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/me/update"
            element={
              <ProtectedRoute >
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/password/update"
            element={
              <ProtectedRoute >
                <UpdatePassword />
              </ProtectedRoute>
            }
          />
        <Route exact path="/password/forgot"element={<ForgotPassword />}/>
        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
        <Route exact path="/cart" element={<Cart/>} />
        <Route
        exact
            path="/shipping"
            element={
              <ProtectedRoute >
                <Shipping />
              </ProtectedRoute>
            }
          />

        <Route
        exact
            path="/success"
            element={
              <ProtectedRoute >
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/orders"
            element={
              <ProtectedRoute >
                <MyOrders />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/order/confirm"
            element={
              <ProtectedRoute >
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/order/:id"
            element={
              <ProtectedRoute >
                <OrderDetails />
              </ProtectedRoute>
            }
          />
        <Route
        exact
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true} >
                <Dashboard />
              </ProtectedRoute>
            }
          />


      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
