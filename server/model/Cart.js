const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }]
});


module.exports = mongoose.model("Cart", CartSchema);
