const wishlists = require("../Models/wishlistModel");

// add to wishlist
exports.addToWishlistController = async (req, res) => {
  //   get userid
  const userId = req.payload;
  const { id, title, price, description, category, image, rating } = req.body;
  try {
    const existingProduct = await wishlists.findOne({ id, userId });
    if (existingProduct) {
      res.status(406).json("Product already inside your wishlist");
    } else {
      const newProduct = new wishlists({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        userId,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// get wishlist
exports.getWishlistController = async (req, res) => {
  const userId = req.payload;
  try {
    const allProducts = await wishlists.find({ userId });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(401).json(err);
  }
};
// remove item
exports.removeWishlistController = async (req, res) => {
  const { id } = req.params;
  try {
    const removeItem = await wishlists.findByIdAndDelete({_id: id });
    res.status(200).json(removeItem);
  } catch (err) {
    res.status(401).json(err);
  }
};
