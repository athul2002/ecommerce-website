import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import './Footer.css'
const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>
                DOWNLOAD OUR APP
            </h4>
            <p>
                Download App for Android and IOS mobile phone
            </p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="Appstore" />
        </div>
        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quality Assured</p>
            <p>Copyrights 2023 &copy; athul</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="http://instagram.com/athul_maliyakkal">Instagram</a>
            <a href="https://www.facebook.com/athul.krishna.714">Facebook</a>
            <a href="https://www.linkedin.com/in/athul-krishna-k-688262223/">LinkedIn</a>
        </div>
    </footer>
  )
}

export default Footer
