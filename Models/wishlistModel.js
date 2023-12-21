const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  productId: {
    type:Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
})

const wishlists = mongoose.model("wishlists",wishlistSchema)
module.exports=wishlists
