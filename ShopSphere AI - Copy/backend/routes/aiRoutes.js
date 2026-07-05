// const express = require('express');
// const { getAIRecommendations } = require('../controllers/aiController');

// const router = express.Router();

// router.get('/recommendations', getAIRecommendations);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  shopping,
  compare,
  cart,
  support,
} = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

// ======================================================
// Shopping Agent
// POST /api/ai/shopping
// ======================================================
router.post("/shopping", authMiddleware, shopping);

// ======================================================
// Compare Agent
// POST /api/ai/compare
// ======================================================
router.post("/compare", authMiddleware, compare);

// ======================================================
// Cart Agent
// POST /api/ai/cart
// ======================================================
router.post("/cart", authMiddleware, cart);

// ======================================================
// Support Agent
// POST /api/ai/support
// ======================================================
router.post("/support", authMiddleware, support);

module.exports = router;