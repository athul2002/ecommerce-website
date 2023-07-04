const express=require('express');
const { getAllProducts, createProduct, updateProducts, deleteProduct, detailProduct, giveProductReview, getProductReviews, deleteReviews } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const router=express.Router();
router.route('/products').get(isAuthenticatedUser,getAllProducts);
router.route('admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProducts).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.route('/product/:id').get(detailProduct)
router.route('/review').put(isAuthenticatedUser,giveProductReview);
router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser,deleteReviews);
module.exports=router