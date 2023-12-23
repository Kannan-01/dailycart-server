const carts = require("../Models/cartModel");

// add to cart
exports.addtocartController = async (req, res) => {
  const userId = req.payload;
  const { id, title, price, description, category, image, rating, quantity } =
    req.body;
  try {
    const existingProduct = await carts.findOne({ id, userId });
    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.grandTotal =
        existingProduct.quantity * existingProduct.price;
      await existingProduct.save();
      res.status(200).json("items added to your cart");
    } else {
      const newProduct = new carts({
        id,
        title,
        price,
        description,
        category,
        image,
        rating,
        quantity,
        grandTotal: price,
        userId,
      });
      await newProduct.save();
      res.status(200).json("item added to your cart");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
};

exports.getcartController = async (req, res) => {
  const userId = req.payload;
  try {
    const allProducts = await carts.find({ userId });
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(401).json(err);
  }
};

// increment quantity
exports.incrementCartController = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedProduct = await carts.findOne({ _id: id });
    if (selectedProduct) {
      selectedProduct.quantity += 1;
      selectedProduct.grandTotal =
        selectedProduct.quantity * selectedProduct.price;
      await selectedProduct.save();
      res.status(200).json("quantity incremented");
    } else {
      res.status(404).json("product not found!!!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// decrement quantity
exports.decrementCartController = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedProduct = await carts.findOne({ _id: id });
    if (selectedProduct) {
      selectedProduct.quantity -= 1;
      if (selectedProduct.quantity == 0) {
        await carts.deleteOne({ _id: id });
        res.status(200).json("item removed");
      } else {
        selectedProduct.grandTotal =
          selectedProduct.quantity * selectedProduct.price;
        await selectedProduct.save();
        res.status(200).json("quantity decremented");
      }
    } else {
      res.status(404).json("product not found!!!");
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// remove cart controller
exports.removeCartController = async (req, res) => {
  const { id } = req.params;
  try {
    await carts.deleteOne({ _id: id });
    res.status(200).json("item removed");
  } catch (err) {
    res.status(401).json(err);
  }
};

// empty cart controller
exports.emptyCartController = async (req, res) => {
  const userId = req.payload;
  try {
    await carts.deleteMany({userId})
    res.status(200).json("All items removed");
  } catch (err) {
    res.status(401).json(err);
  }
};

