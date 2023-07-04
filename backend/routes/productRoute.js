const express=require('express');
const { getAllProducts, createProduct, updateProducts, deleteProduct, detailProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');
const router=express.Router();
router.route('/products').get(isAuthenticatedUser,getAllProducts);
router.route('/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProducts).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(isAuthenticatedUser,authorizeRoles("admin"),detailProduct);
module.exports=router