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
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const navigate=useNavigate();

    const {error,orders}=useSelector((state)=>state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);
    const deleteOrderHandler=(id)=>{
        dispatch(deleteOrder(id));
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
            alert.success("Order Deleted Successfully")
            navigate("/admin/orders")
            dispatch({type:DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders());
    },[dispatch,alert,error,navigate,isDeleted,deleteError]);


    const columns = [
                {field:"id",headerName:"Order ID",minWidth: 200, flex: 0.5},
        {field:"status",headerName:"Status",minWidth: 150,flex: 0.5,      
        cellClassName: (params) => {
            return params.value === "Delivered"
              ? "greenColor"
              : "redColor";
          },},
        {field:"itemsQty",headerName:"Items Qty",type: "number",minWidth: 150,flex: 0.4,},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Actions",sortable:false,flex:0.3,minWidth:150,
        renderCell:(params)=>{
            return(
                <Fragment>
                    <Link to={`/admin/order/${params.value}`}>
                        <EditIcon/>
                    </Link>
                    <Button onClick={()=>deleteOrderHandler(params.value)}>
                        <DeleteIcon/>
                    </Button>
                </Fragment>
            )
        }
    }
      ];
    
      const rows = [];
    
    orders && orders.forEach((item)=>{
        rows.push({
            id:item._id,
            actions:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus
        });
    });

    
  return (
    <Fragment>
        <MetaData title={`All Orders`}/>
        <div className="dashboard">
            <SideBar/>
            <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList
