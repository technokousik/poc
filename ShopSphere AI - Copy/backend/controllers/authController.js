// exports.registerUser = (req, res) => {
//   res.status(200).json({ message: 'Register route ready' });
// };

// exports.loginUser = (req, res) => {
//   res.status(200).json({ message: 'Login route ready' });
// };

const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// ==========================
// Register User
// ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password before sending response
    const userData = user.toObject();
    delete userData.password;
//const user = await User.findOne({ email }).select("+password");    //better interview approch
    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: generateToken(user._id, user.role),
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Login User
// ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Remove password before sending response
    const userData = user.toObject();
    delete userData.password;
//const user = await User.findOne({ email }).select("+password");
  
res.status(200).json({
      success: true,
      message: "Login Successful",
      token: generateToken(user._id, user.role),
      user: userData,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Logged-in User Profile
// ==========================
exports.profile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};