import React, { useEffect } from 'react'
import Sidebar from './Sidebar.js'
import './Dashboard.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {Doughnut, Line} from "react-chartjs-2"
import { Chart, registerables } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers} from '../../actions/userActions.js'

Chart.register(...registerables);
const Dashboard = () => {
  const dispatch=useDispatch();
  let outOfStock=0;
  let totalCount=0;
  const {products}=useSelector((state)=>state.products)
  const {orders}=useSelector((state)=>state.allOrders)
  const {users}=useSelector((state)=>state.allUsers)
  products && products.forEach((item)=>{
    if(item.stock===0)
    {
      outOfStock+=1;
    }
    else
    totalCount+=1;

  })
  useEffect(()=>{
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  },[dispatch])
  let totalAmount=0;
  orders && orders.forEach((item)=>{
    totalAmount+=item.totalPrice;
  })
  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[{
      label:"TOTAL AMOUNT",
      backgroundColor:["#990011"],
      hoverBackgroundColor:["rgb(197,72,49)"],
      data:[0,totalAmount],
    },
  ],

  };
  const doughnutState={
    labels:["Out of Stock","In Stock"],
    datasets:[{
      label:"TOTAL AMOUNT",
      backgroundColor: ["#00A6B4", "#6800B4"],
      hoverBackgroundColor: ["#4B5000", "#35014F"],
      data:[outOfStock,totalCount],
    },
  ],
}
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboardContainer">
      <Typography component="h1" id='typographyDashboard'>DASHBOARD</Typography>
      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br/> {`Rs ${totalAmount}`}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products">
            <p>Products</p>
            <p>{products&& products.length}</p>
          </Link>
          <Link to="/admin/orders">
            <p>Orders</p>
            <p>{orders&&orders.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users&&users.length}</p>
          </Link>
        </div>
      </div>
      <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
