import express from 'express'

import UserLogin from '../Controller/user/UserLogin.js'
import authToken from '../middleware/AuthToken.js'
import UserDetails from '../Controller/user/UserDetails.js'
import UserLogout from '../Controller/user/UserLogout.js'
import AllUsers from '../Controller/user/AllUsers.js'
import UploadProduct from '../Controller/product/uploadProduct.js'
import GetProduct from '../Controller/product/getProduct.js'
import UpdateProduct from '../Controller/product/updateProduct.js'
import UserSignup from '../Controller/user/UserSignup.js'
import UpdateUser from '../Controller/user/updateUser.js'
import getProductCategory from '../Controller/product/getProductCategoryOne.js'
import getCategoryWiseProduct from '../Controller/product/getCategoryWiseProduct.js'
import GetProductDetails from '../Controller/product/getProductDetails.js'
import addToCart from '../Controller/user/addToCart.js'
import countAddToCartProduct from '../Controller/user/countAddToCartProduct.js'
import viewAddToCartProduct from '../Controller/user/viewAddToCartProduct.js'
import updateAddToCartProduct from '../Controller/user/updateAddToCartProduct.js'
import deleteAddToCartProduct from '../Controller/user/deleteAddCartProduct.js'
import searchProduct from '../Controller/product/searchProduct.js'
import filterProduct from '../Controller/product/filterProduct.js'
import payment from '../Controller/payment&order/payment.js'
import webhook from '../Controller/payment&order/weghook.js'
import order from '../Controller/payment&order/order.js'
import allOrder from '../Controller/payment&order/allOrder.js'
import SendEmail from '../Controller/user/sendEmail.js'
import ChangePassword from '../Controller/user/changePassword.js'

const router = express.Router()


router.post('/signup',UserSignup)
router.post('/login',UserLogin)
router.get('/user-details',authToken,UserDetails)
router.get('/logout',UserLogout)
router.post('/send-email',SendEmail)
router.post('/reset-password/:id/:token',ChangePassword)

//admin pannel
router.get('/all-users', authToken,AllUsers)
router.post('/update-user', authToken,UpdateUser)

//upload product
router.post('/upload-product', authToken,UploadProduct)
//get product
router.get('/get-product',GetProduct)
router.post('/update-product',authToken,UpdateProduct)
// access by user
router.get('/get-product-category',getProductCategory)
router.post('/category-wise-product',getCategoryWiseProduct)
router.post('/product-details',GetProductDetails)
router.get('/search-product',searchProduct)
router.post('/filter-product',filterProduct)

// user add to cart //
router.post('/addtoCart',authToken,addToCart)
router.get('/countAddtoCartProduct',authToken,countAddToCartProduct)
router.get('/viewCartProduct',authToken,viewAddToCartProduct)
router.post('/updateCartProduct',authToken,updateAddToCartProduct)
router.post('/deleteCartProduct',authToken,deleteAddToCartProduct)


// payment and order 
router.post('/payment',authToken,payment)
router.post('/webhook',webhook)   // api/webhook
router.get('/order-list',authToken,order)   // api/webhook
router.get('/all-order',authToken,allOrder)   // api/webhook

export default router