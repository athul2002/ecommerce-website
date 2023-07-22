import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, newProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";


const NewProduct = () => {
  const alert=useAlert();
  const dispatch=useDispatch();
  const {loading,error,success}=useSelector((state)=>state.newProduct)
  const [name,setName]=useState("");
  const [price,setPrice]=useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const navigate=useNavigate();
  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({
        type:NEW_PRODUCT_RESET
      });
    }
  },[dispatch,error,alert,success,navigate])
  const createProductSubmitHandler=(e)=>{
    e.preventDefault();

    const myform=new FormData();

    myform.set("name",name);
    myform.set("price",price);
    myform.set("description",description);
    myform.set("category",category);
    myform.set("stock",Stock);

    images.forEach((image)=>{
      myform.append("images",image)
    });
    dispatch(newProduct(myform));
  }
  const createProductImagesChange=(e)=>{
    const files=Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file)=>{
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2)
        {
          setImagesPreview((old)=>[...old,reader.result]);
          setImages((old)=>[...old,reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  return (
    <Fragment>
      <MetaData title="Create Product"/>
      <div className="dashboard">
        <SideBar/>
        <div className="newProductContainer">
          <form 
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}>
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon/>
              <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
              <AttachMoneyIcon/>
              <input
              type="number"
              placeholder="Price"
              required
              onChange={(e)=>setPrice(e.target.value)}/>
            </div>
            <div>
              <DescriptionIcon/>
              <textarea
              placeholder="Product Description"
              cols="30"
              rows="1"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
              <AccountTreeIcon/>
              <select onChange={(e)=>setCategory(e.target.value)}>
                <option value="">
                  Choose Category
                </option>
                {
                  categories.map((cate)=>
                   ( <option key={cate} value={cate}>
                      {cate}
                    </option>)
                  )
                }
              </select>
            </div>
            <div>
              <StorageIcon/>
              <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e)=>setStock(e.target.value)} />
            </div>
            <div>
              <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple/>
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image,index)=>(
                <img key={index} src={image} alt="Product Preview"/>
              ))}
            </div>
            <Button id="createProductBtn" type="Submit" disabled={loading?true:false}>Create</Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default NewProduct
