const { Magic } = require("@magic-sdk/admin");
const User = require("../models/UserModel");
require("dotenv").config();

const magic = new Magic(process.env.MAGIC_SECRET_KEY);


//register user
module.exports.register = async (req, res) => {
  const { email, firstname, lastname, role } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const newUser = new User({
      email,
      firstname,
      lastname,
      role,
    });
    await newUser.save();
    return res.status(201).send("User created successfully");
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// check if user email exists in database
module.exports.check2 = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(200).json({
        status: false,
      });
    }
    return res.status(200).json({
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// check if user email exists in database
module.exports.check = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(200).json({
        status: false,
      });
    } else {
      if (user.role && user.role === "doctor") {
        return res.status(200).json({
          status: true,
          doctor: true,
        });
      } else {
        return res.status(200).json({
          status: true,
          doctor: false,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// login user
module.exports.login = async (req, res) => {
  try {
    const didToken = req.headers.authorization.substring(7);
    await magic.token.validate(didToken);
    console.log("User is authenticated");
    const issuer = await magic.token.getIssuer(didToken);
    console.log(issuer);
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(400).send("User does not exist");
    }
    //update the magicId
    user.magicId = issuer;
    await user.save();
    return res.status(200).json({ authenticated: true });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
