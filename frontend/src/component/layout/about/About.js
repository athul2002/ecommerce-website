import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/athul_maliyakkal";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Athul Krishna</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @athul. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
 
            <a href="https://instagram.com/meabhisingh" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;