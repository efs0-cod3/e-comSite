const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }]
},{versionKey: false});


CartSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


module.exports = mongoose.model("Cart", CartSchema);
