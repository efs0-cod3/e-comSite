const express = require("express");
const router = express.Router()
const cartController = require("../controller/cartController");
const verifyToken = require("../middleware/verifyToken")

router.post("/addtocart/:id", verifyToken, cartController.addToCart)
router.get("/", verifyToken, cartController.getCartProducts)
router.delete("/delfromcart/:id", verifyToken, cartController.delProductFromCart)

module.exports = router