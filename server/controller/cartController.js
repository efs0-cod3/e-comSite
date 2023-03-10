const Cart = require("../model/Cart");
const User = require("../model/User");
const Product = require("../model/Product");

exports.addToCart = async (req, res) => {
  // adds product to cart!
  try {
    const user = await User.findById(req.userId);
    const cart = await Cart.findById(user.cart);
    const product = await Product.findById({ _id: req.params.id });
    if (cart.products.includes(product.id)) {
      res.status(200).json({ message: "Item already exists in cart" });
    }else{
      cart.products = cart.products.concat(product.id);
      cart.save();
      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.getCartProducts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const cart = await Cart.findById(user.cart);
    const cartProducts = await cart.populate("products");
    res.status(200).json({ message: "Cart products", cart });
  } catch (error) {
    console.log(error);
  }
};

exports.delProductFromCart = async (req, res) => {
  // delete product from cart!
  try {
    const user = await User.findById(req.userId);
    const cart = await Cart.findById(user.cart);
    // const product = await Product.findById({_id: req.params.id});
    await cart.updateOne({ $pull: { products: req.params.id } });
  
    cart.save();
    res.status(200).json({ message: "product deleted from cart", cart });
  } catch (error) {
    res.status(400).json(error);
  }
};
