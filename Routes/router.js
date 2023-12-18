const express = require('express')
const router= new express.Router()
const productController = require('../Controllers/productController')

// get all products
router.get('/products/all',productController.getAllProductsController)


module.exports =router