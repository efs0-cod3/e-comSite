const User = require("../model/User");
// const Cart = require("../model/Cart");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const cartCreate = require("../lib/cartInitialSetup")

exports.createUser = async (req, res) => {
  const { name, username, email, pwd } = req.body;

  if ((!name, !username || !email || !pwd))
    res
      .status(400)
      .json({ message: "name, username, email & password are required" });

  // validates if email is in correct format and if it is, if already exist in database.
  let duplicatedEmail;
  if (validator.isEmail(email)) {
    duplicatedEmail = await User.findOne({ email }).exec();
  }

  if (duplicatedEmail || !validator.isEmail(email)) {
    return res.status(409).json({ message: "Email duplicated or not Valid" }); //conflict
  }

  //   checks username
  let duplicatedUsername = await User.findOne({ username }).exec();
  if (duplicatedUsername) {
    return res.status(409).json({ message: "Username is duplicated" }); //conflict
  }

  // validates if password length is greater than 8.
  if (!validator.isLength(pwd, { min: 8 })) {
    return res
      .status(409)
      .json({ message: "Password must have more than 8 characters" }); //conflict
  }

  try {
    //encrypt pawd
    const hashedpwd = await bcrypt.hash(pwd, 10);
    //create and store new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedpwd,
    });
    user.cart = cartCreate(user.id)

    const token = jwt.sign({id: user.id}, process.env.SECRET,{
      expiresIn: "1h"
    })

    res.status(201).json({ token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const getUsers = await User.find({}).populate('cart');
    res.status(302).json(getUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ id: req.body.id });  
    res.status(200).json({message: 'user deleted'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.userLogin = async (req,res) => {
  try {
    // checks if email exist
     const foundUser = await User.findOne({email: req.body.email})
     if (!foundUser) { return res.status(400).json({message: "wrong email or password"})}
    // checks pwd if matches with hash
    const match = await bcrypt.compare(req.body.password, foundUser.password)
    if (!match) { return res.status(400).json({token: "null" , message: "wrong email or password"}) }

    const token = jwt.sign({id: foundUser.id}, process.env.SECRET,{
      expiresIn: "1h"
    })

    return res.status(201).json({ token, name: foundUser.name, username: foundUser.username });
   } catch (error) {
    res.status(400).json({message: error})
   }
}

