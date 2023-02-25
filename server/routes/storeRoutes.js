const express = require("express");
const router =  express.Router()
const storeController = require("../controller/storeController")
const verifyToken = require("../middleware/verifyToken")



router.post("/create",verifyToken, storeController.createStore)
router.get("/get",verifyToken, storeController.getStore)
router.delete("/delete",verifyToken, storeController.deleteStore)


module.exports = router