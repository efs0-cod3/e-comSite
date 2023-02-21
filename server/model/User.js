const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  }
},
{
  versionKey: false
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;

    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", UserSchema);
