const express = require('express')
const router= new express.Router()
const productController = require('../Controllers/productController')
const userController = require('../Controllers/userController')
const wishlistController = require('../Controllers/wishlistController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')
// get all products
router.get('/products/all',productController.getAllProductsController)

// for register user
router.post('/user/register',userController.registerController)

// for login
router.post('/user/login',userController.loginController)

// for product details
router.get('/product/get/:id',productController.getProductController)

//add to wishlist
router.get('/wishlist/add/:id',jwtMiddleware,wishlistController.addToWishlistController)

module.exports =router