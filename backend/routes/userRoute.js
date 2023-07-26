const express=require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, detailUser, updatePassword, updateUserDetail, getAllUsers, getUser, updateUserRole, deleteUser, registerUserFirst, verifiedMail } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router=express.Router();
router.route('/register').post(registerUserFirst);
router.route('/verify/email/:token').get(verifiedMail);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser,detailUser);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/me/update').put(isAuthenticatedUser,updateUserDetail);
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRoles("admin"),getUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports=router;