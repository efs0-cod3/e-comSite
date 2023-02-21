
const Cart = require('../model/Cart')
const User = require('../model/User')

const createCart = async (userId) => {
    const newCart = await Cart.create({
        user: userId
    })
    const user = await User.findById(userId)
    user.cart = newCart.id
    user.save()
}

module.exports = createCart