import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { confirmMail } from '../../actions/userActions';
import ErrorIcon from "@mui/icons-material/Error";
import "./VerifyEmail.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const VerifyEmail = () => {
    const dispatch=useDispatch();
    const {token}=useParams();
    
    useEffect(()=>{
      dispatch(confirmMail(token));
      
    },[dispatch,token])
  return (
    <div className="verifyMail">
      <ErrorIcon />

      <Typography>Thank You for Email Verification, Please Login To Access Your Account </Typography>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default VerifyEmail
