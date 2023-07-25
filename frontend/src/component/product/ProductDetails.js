 import React, { Fragment,useEffect, useState} from 'react';
 import Carousel from "react-material-ui-carousel";
 import "./ProductDetails.css";
 import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard.js'
import Loader from '../layout/Loader/Loader'
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
import {addItemsToCart} from '../../actions/cartAction'
import { Button, Dialog,DialogActions,DialogContent, DialogTitle, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addToFavourite, removeItemsFromFavourite } from '../../actions/favouriteAction';
// import FavouriteBorderIcon from '@mui/icons-material/FavoriteBorder'
 const ProductDetails = () => {
  
    const alert=useAlert();
    const { id } = useParams();
    const dispatch=useDispatch();
    const {product,loading,error}=useSelector((state)=>state.productDetails);
    const {success,error:reviewError}=useSelector((state)=>state.newReview);
    const {favourites}=useSelector((state)=>state.favourite)
    const [quantity,setQuantity]=useState(1);
    const [open,setOpen]=useState(false);
    const [rating,setRating]=useState(0);
    const [comment,setComment]=useState("");
    const increaseQuantity=()=>{

      if(product.stock<=quantity)
      return;
      const qty=quantity+1;
      setQuantity(qty);
    }
    const decreaseQuantity=()=>{
      if(quantity<=1)
      return;

      const qty=quantity-1;
      setQuantity(qty);

    }

    const addToCartHandler=()=>{
      dispatch(addItemsToCart(id,quantity));
      alert.success("Item Added to Cart");
    };

    let isFav=0;
    favourites && favourites.map(function(item){
      if(item.productId===id)
      {
        isFav=1;
      }
      return 0
    }
    
)
    const addToFavoriteHandler=()=>{
      dispatch(addToFavourite(id));
      alert.success("Item Added to Favorites");
    };
    const removeFavoriteHandler=()=>{
      dispatch(removeItemsFromFavourite(id));
      alert.success("Item Removed from Favorites");
    };
    const submitReviewToggle=()=>{
      open?setOpen(false):setOpen(true);
    };
    const reviewSubmitHandler=()=>{
      const myForm=new FormData();
      myForm.set("rating",rating)
      myForm.set("comment",comment)
      myForm.set("productId",id)
      dispatch(newReview(myForm));
      setOpen(false);
    }
    useEffect(() => {
      if(error)
      {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(reviewError)
      {
        alert.error(reviewError);
        dispatch(clearErrors());
      }
      if(success)
      {
        alert.success("Review Submitted Successfully");
        dispatch({type:NEW_REVIEW_RESET})
      }
        dispatch(getProductDetails(id))
    }, [dispatch,id,alert,error,reviewError,success])
    const options={
        size:"large",
        value:product.ratings, 
        readOnly:true,
        precision:0.5
    }

   return (
    <Fragment>
      {loading?<Loader/>:<Fragment>
      <MetaData title={`${product.name} -- flamboyant`} />
        <div className="ProductDetails">
        <div className='imageDisplay'>
              <Carousel className='carosContainer'>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
        <div className='otherDisplay'>
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id} </p>
            </div>
            <div className="detailsBlock-2">
                <Rating {...options}/>
                <span>({product.numOfReviews} Reviews)</span>
            </div>

            <div className="detailsBlock-3">
                <h1>{`Rs ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly type="number" value={quantity}/>
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                  </div>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
            </div>
            <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
            </div>
            <div className='btns'>
              <button onClick={submitReviewToggle}className="submitReview">
                  Submit Review
              </button>
              {
                favourites && isFav?<button onClick={removeFavoriteHandler}className="addToFavorite">
                  Remove From Favorite
              </button>:<button onClick={addToFavoriteHandler}className="addToFavorite">
                  Add to Favorite
              </button>
                
              }
            </div>
        </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>
        <Dialog aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggle}>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className='submitDialog'>
            <Rating onChange={(e)=>setRating(e.target.value)}
            value={rating}
            size='large'/>
          <textarea className='submitDialogTextArea' cols="30" rows="5" value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
          </DialogContent>
          <DialogActions>
            <Button  onClick={submitReviewToggle}color='secondary'>Cancel</Button>
            <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
          </DialogActions>
        </Dialog>
        {product.reviews&&product.reviews[0] ? (
          <div className="reviews">
            {product.reviews && product.reviews.map((review)=><ReviewCard key={review} review={review}/>)}
          </div>
        ):(<p className='noReviews'>
          No Reviews Yet
        </p>)}
    </Fragment>}
    </Fragment>
   )
 }
 
 export default ProductDetails
 