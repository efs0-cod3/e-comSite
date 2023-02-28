const Cart = require("../model/Cart")
const User = require("../model/User")
const Product = require("../model/Product")



exports.addToCart = async (req,res) => {
    // adds product to cart!
  try {
    const user = await User.findById(req.userId)
    const cart = await Cart.findById(user.cart)
    const product = await Product.findById({_id: req.params.id})
    cart.products = cart.products.concat(product.id)
    cart.save()
    console.log({cart});
    res.status(201).json({message: "product added to cart", cart})
  } catch (error) {
    console.log(error);
    res.status(400).json({error})
  }
}

exports.delProductFromCart = async (req,res) => {
    // delete product from cart!
  try {
    const user = await User.findById(req.userId);
    const cart = await Cart.findById(user.cart);
    // const product = await Product.findById({_id: req.params.id});
    await cart.updateOne({$pull: {products: req.params.id}});
    cart.count = await cart.countDocuments(cart.products)
    cart.save()
    res.status(201).json({message: "product added to cart", cart,product})
  } catch (error) {
    console.log(error);
    res.status(400).json({error})
  }
}