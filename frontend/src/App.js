import Header from "./component/layout/header/Header.js"
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import './App.css';
import WebFont from "webfontloader"
import React from "react";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js"
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
      <Route exact path="/" Component={Home}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
