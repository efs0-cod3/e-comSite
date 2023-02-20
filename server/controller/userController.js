const User = require("../model/User");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
    const result = await User.create({
      name,
      username,
      email,
      password: hashedpwd,
    });
    console.log(result);
    res.status(201).json({ success: "saved" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const getUsers = await User.find({});
    console.log(getUsers);
    res.status(201).json(getUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ id: req.body.id });
    console.log(removeUser);
    res.status(201).json(removeUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
