const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  storename: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
},
{
  versionKey: false
});

StoreSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
  },
});

module.exports = mongoose.model("store", StoreSchema);
