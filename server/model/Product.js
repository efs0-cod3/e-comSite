const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    public_id: { 
      type: String,
      required: true,
    },
     url: {
      type: String,
      required: true,
    }
  },
  quantity: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  store:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  date: {
    type: Date,
    default: new Date(),
  },
},{versionKey: false});

ProductSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("Product", ProductSchema);
