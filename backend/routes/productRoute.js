const express=require('express');
const { getAllProducts, createProduct, updateProducts, deleteProduct, detailProduct } = require('../controllers/productController');
const router=express.Router();
router.route('/products').get(getAllProducts);
router.route('/product/new').post(createProduct);
router.route('/product/:id').put(updateProducts);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(detailProduct);
module.exports=router