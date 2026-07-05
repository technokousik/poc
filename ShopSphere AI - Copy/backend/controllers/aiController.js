// exports.getAIRecommendations = (req, res) => {
//   res.status(200).json({ message: 'AI recommendations route ready' });
// };




const {
  shoppingAgent,
  compareAgent,
  cartAgent,
  supportAgent,
} = require("../services/aiService");


// ======================================================
// Shopping Agent Controller
// POST /api/ai/shopping
// ======================================================

const shopping = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    const result = await shoppingAgent(query);

    return res.status(200).json(result);

  } catch (error) {

    console.error("Shopping Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// Compare Agent Controller
// POST /api/ai/compare
// ======================================================

const compare = async (req, res) => {
  try {

    const { productId1, productId2 } = req.body;

    // Validate Request
    if (!productId1 || !productId2) {
      return res.status(400).json({
        success: false,
        message: "Both Product IDs are required.",
      });
    }

    // Call Compare Agent
    const result = await compareAgent(productId1, productId2);

    return res.status(200).json(result);

  } catch (error) {

    console.error("Compare Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// Cart Agent Controller
// POST /api/ai/cart
// ======================================================

const cart = async (req, res) => {
  try {

    // Logged-in User ID from JWT
    const userId = req.user.id;

    // Call Cart Agent
    const result = await cartAgent(userId);

    return res.status(200).json(result);

  } catch (error) {

    console.error("Cart Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ======================================================
// Support Agent Controller
// POST /api/ai/support
// ======================================================

const support = async (req, res) => {
  try {

    // Logged-in User ID from JWT
    const userId = req.user.id;

    // User Question
    const { query } = req.body;

    // Validate Input
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Support query is required.",
      });
    }

    // Call Support Agent
    const result = await supportAgent(userId, query);

    return res.status(200).json(result);

  } catch (error) {

    console.error("Support Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
module.exports = {
  shopping,
  compare,
  cart,
  support
};

