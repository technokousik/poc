// const express = require('express');
// const { getDashboardStats } = require('../controllers/dashboardController');

// const router = express.Router();

// router.get('/stats', getDashboardStats);

// module.exports = router;
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  dashboard,
} = require("../controllers/dashboardController");

router.get(
  "/",
  protect,
  adminMiddleware,
  dashboard
);

module.exports = router;