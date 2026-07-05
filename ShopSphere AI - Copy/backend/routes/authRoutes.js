// const express = require('express');
// const { registerUser, loginUser } = require('../controllers/authController');

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// module.exports = router;



const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", protect, profile);

module.exports = router;