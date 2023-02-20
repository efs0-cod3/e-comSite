const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

router.post("/", userController.createUser)
router.get("/get", userController.getUsers)
router.delete("/delete/:id", userController.removeUser)

module.exports = router