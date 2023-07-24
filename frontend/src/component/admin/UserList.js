import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./OrderList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {error,users}=useSelector((state)=>state.allUsers);
    const { error: deleteError, isDeleted,message } = useSelector((state) => state.profile);
    const deleteUserHandler=(id)=>{
        dispatch(deleteUser(id));
    };
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError)
        {
            alert.error(deleteError);
            dispatch(clearErrors())
        }
        if(isDeleted)
        {
            alert.success(message)
            navigate("/admin/users")
            dispatch({type:DELETE_USER_RESET})
        }
        dispatch(getAllUsers());
    },[dispatch,alert,error,message,navigate,isDeleted,deleteError]);


    const columns = [
        {field:"id",headerName:"User ID",minWidth: 150, flex: 0.5},
        {field:"email",headerName:"Email",minWidth:150,flex:0.5},
        {field:"name",headerName:"User Name",minWidth: 150,flex: 0.4,},
        {field:"role",headerName:"User Role",minWidth: 150,flex: 0.3,
        cellClassName: (params) => {
          return params.value === "admin"
            ? "greenColor"
            : "redColor";
        },},
        {field:"actions",headerName:"Actions",sortable:false,flex:0.3,minWidth:150,
        renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/user/${params.value}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteUserHandler(params.value)}>
                        <DeleteIcon/>
                    </Button>
                </Fragment>
            )
        }
    }
      ];
    
      const rows = [];
    
    users && users.forEach((item)=>{
        rows.push({
            id:item._id,
            actions:item._id,
            role:item.role,
            email:item.email,
            name:item.name
        });
    });

    
  return (
    <Fragment>
        <MetaData title={`All Users`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>

            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            />
            </div>
        </div>
    </Fragment>
  )
}

export default UserList
