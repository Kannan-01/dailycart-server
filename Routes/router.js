const express = require("express");
const router = new express.Router();
const productController = require("../Controllers/productController");
const userController = require("../Controllers/userController");
const wishlistController = require("../Controllers/wishlistController");
const cartController = require("../Controllers/cartController");
const jwtMiddleware = require("../Middlewares/jwtMiddleware");
// get all products
router.get("/products/all", productController.getAllProductsController);

// for register user
router.post("/user/register", userController.registerController);

// for login
router.post("/user/login", userController.loginController);

// for product details
router.get("/product/get/:id", productController.getProductController);

//add to wishlist
router.post(
  "/wishlist/add",
  jwtMiddleware,
  wishlistController.addToWishlistController
);
// get wishlist
router.get(
  "/wishlist/get-allproducts",
  jwtMiddleware,
  wishlistController.getWishlistController
);

router.delete(
  "/wishlist/remove/:id",
  jwtMiddleware,
  wishlistController.removeWishlistController
);

router.post("/cart/add", jwtMiddleware, cartController.addtocartController);

// cart get-all-products
router.get(
  "/cart/get-all-products",
  jwtMiddleware,
  cartController.getcartController
);
// increment item
router.get(
  "/cart/increment/:id",
  jwtMiddleware,
  cartController.incrementCartController
);
// decrement item
router.get(
  "/cart/decrement/:id",
  jwtMiddleware,
  cartController.decrementCartController
);
// remove cart item
router.delete(
  "/cart/remove/:id",
  jwtMiddleware,
  cartController.removeCartController
);

// empty cart item
router.delete("/cart/empty", jwtMiddleware, cartController.emptyCartController);
module.exports = router;
