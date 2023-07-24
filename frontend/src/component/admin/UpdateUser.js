import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userActions";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";

const NewProduct = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {user,error,loading}=useSelector((state)=>state.userDetails)
  const {loading: updateLoading,
    error: updateError,
    isUpdated,}=useSelector((state)=>state.profile)
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [role, setRole] = useState("");
  const navigate=useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    if(user && user._id!==id)
    {
        dispatch(getUserDetails(id));
    }
    else{
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(updateError){
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if(isUpdated)
    {
        alert.success("User Details Updated")
        navigate("/admin/users")
        dispatch({type:UPDATE_USER_RESET});
    }
    
  },[dispatch,error,alert,isUpdated,navigate,updateError,id,user])
  const updateUserSubmitHandler=(e)=>{
    e.preventDefault();

    const myform=new FormData();

    myform.set("name",name);
    myform.set("email",email);
    myform.set("role",role);
    dispatch(updateUser(id,myform));
  }

  return (
    <Fragment>
      <MetaData title="Update User"/>
      <div className="dashboard">
        <SideBar/>
        <div className="newProductContainer">
            {
                loading ?(<Loader/>):(
                    <form 
                    className="createProductForm"
                    onSubmit={updateUserSubmitHandler}>
                      <h1>Update User</h1>
                      <div>
                        <PersonIcon/>
                        <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}/>
                      </div>
                      <div>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}/>
                      </div>
                      <div>
                        <VerifiedUserIcon/>
                        <select value={role} onChange={(e)=>setRole(e.target.value)}>
                            <option value="">Choose Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                      </div>
                      <Button id="createProductBtn" type="Submit" disabled={updateLoading?true:false||role===""?true:false}>Update</Button>
                    </form>
                )
            }
 
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct
