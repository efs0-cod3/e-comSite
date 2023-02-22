const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const productController = require("../controller/productController")
const verifyToken = require("../middleware/verifyToken")


router.post("/create",verifyToken,upload.single("image"), productController.postProduct)
router.delete("/remove/:id",verifyToken, productController.deleteProduct)
router.get("/get",verifyToken, productController.getProducts)

module.exports = router