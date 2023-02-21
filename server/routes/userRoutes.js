const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")
const verifyToken = require("../middleware/verifyToken")



router.post("/register", userController.createUser)
router.post("/login", userController.userLogin)
// test routes
router.delete("/delete/:id",  userController.removeUser)
router.get("/get",verifyToken, userController.getUsers)

module.exports = router