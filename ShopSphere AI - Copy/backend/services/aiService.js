// const { ai } = require('../config/gemini');

// const getRecommendations = async (prompt) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.0-flash',
//       contents: prompt
//     });

//     return response.text;
//   } catch (error) {
//     console.error('Gemini AI error:', error.message);
//     throw error;
//   }
// };

// module.exports = { getRecommendations };








// ======================================================

const Product = require("../models/Product");
const ai = require("../config/gemini");

// ======================================================
// SHOPPING AGENT
// ======================================================


// ======================================================
// Helper Function - Extract Budget
// Example:
// "Laptop under 60000"
// "Phone below 25000"
// ======================================================

// ======================================================
// Extract Budget from User Query
// Supports:
// ₹60000
// Rs 60000
// INR 60000
// under 60000
// below 60000
// around 60000
// ======================================================

const extractBudget = (query) => {
  if (!query || typeof query !== "string") {
    return null;
  }

  const lowerQuery = query.toLowerCase();

  // Match the first number (supports commas)
  const match = lowerQuery.match(/(\d[\d,]*)/);

  if (!match) {
    return null;
  }

  // Remove commas
  const amount = match[1].replace(/,/g, "");

  return Number(amount);
};

// ======================================================
// Helper Function - Extract Category
// ======================================================

// ======================================================
// Extract Product Category from User Query
// ======================================================

const extractCategory = (query) => {
  if (!query || typeof query !== "string") {
    return null;
  }

  const lowerQuery = query.toLowerCase();

  // Category keywords
  const categoryMap = {
    laptop: [
      "laptop",
      "notebook",
      "macbook",
      "gaming laptop",
      "ultrabook"
    ],

    mobile: [
      "mobile",
      "phone",
      "smartphone",
      "iphone",
      "android"
    ],

    headphone: [
      "headphone",
      "headphones",
      "bluetooth headphone",
      "wireless headphone"
    ],

    earbuds: [
      "earbuds",
      "earbud",
      "airpods",
      "buds"
    ],

    keyboard: [
      "keyboard",
      "mechanical keyboard",
      "gaming keyboard"
    ],

    mouse: [
      "mouse",
      "gaming mouse",
      "wireless mouse"
    ],

    monitor: [
      "monitor",
      "display",
      "screen"
    ],

    camera: [
      "camera",
      "dslr",
      "mirrorless"
    ],

    tablet: [
      "tablet",
      "ipad"
    ],

    watch: [
      "watch",
      "smartwatch",
      "smart watch"
    ],

    speaker: [
      "speaker",
      "bluetooth speaker"
    ]
  };

  // Search every category
  for (const category in categoryMap) {
    const keywords = categoryMap[category];

    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) {
        return category;
      }
    }
  }

  return null;
};


// ======================================================
// Fetch Products from MongoDB
// ======================================================

const fetchProducts = async (category, budget) => {
  try {
    const filter = {};

    // Category Filter
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    // Budget Filter
    if (budget) {
      filter.price = {
        $lte: budget,
      };
    }

    // Fetch Matching Products
    let fetchedProducts = await Product.find(filter)
      .select(
        "name brand category price rating stock description image"
      )
      .sort({
        rating: -1,
        price: 1,
      })
      .limit(5);

    // If no products found, return Top Rated Products
    if (fetchedProducts.length === 0) {
      fetchedProducts = await Product.find()
        .select(
          "name brand category price rating stock description image"
        )
        .sort({
          rating: -1,
          price: 1,
        })
        .limit(5);
    }

    // Convert Mongoose Documents into Plain Objects
    const products = fetchedProducts.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      image: product.image,
      description: product.description,
    }));

    return products;

  } catch (error) {
    console.error("Fetch Products Error:", error);
    throw new Error("Unable to fetch products.");
  }
};

// ======================================================
// Build Shopping Prompt for Gemini
// ======================================================

const buildShoppingPrompt = (userQuery, products) => {

  return `
You are ShopSphere AI, an intelligent shopping assistant for an e-commerce platform.

Your responsibility is to help customers choose the most suitable product based ONLY on the products provided below.

Do NOT recommend products outside this list.

--------------------------------------------------
CUSTOMER QUERY
--------------------------------------------------

${userQuery}

--------------------------------------------------
AVAILABLE PRODUCTS
--------------------------------------------------

${JSON.stringify(products, null, 2)}

--------------------------------------------------
YOUR TASK
--------------------------------------------------

1. Carefully understand the customer's requirement.

2. Compare the available products.

3. Recommend the BEST product.

4. Explain why it is the best choice.

5. Mention its Pros.

6. Mention its Cons.

7. Recommend one alternative product.

8. Give a short buying advice.

9. Keep the response concise and professional.

10. Never invent specifications that are not provided.

11. If there are fewer than two matching products, still recommend the best available product.

12. If no suitable product exists, clearly explain why instead of inventing one.

--------------------------------------------------
RETURN RESPONSE STRICTLY IN JSON
--------------------------------------------------

{
  "recommendedProduct": "",
  "reason": "",
  "pros": [],
  "cons": [],
  "alternativeProduct": "",
  "buyingAdvice": ""
}

IMPORTANT:
- Return ONLY valid JSON.
- Do not wrap the response in markdown.
- Do not use code fences.
- Do not add any explanation.
- Return only the JSON object.
`;
};


// ======================================================
// Shared Gemini API Function  normal config .....callGemini 


// const callGemini = async (prompt) => {
//   try {

//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     // SDK returns plain text
//     const text = response.text;

//     return {
//       success: true,
//       data: text,
//     };

//   } catch (error) {

//     console.error("Gemini Error:", error);

//     return {
//       success: false,
//       message: error.message,
//     };

//   }
// };


// ======================================================
// Shared Gemini API Function
// Used By:
// ✔ Shopping Agent
// ✔ Compare Agent
// ✔ Cart Agent
// ✔ Support Agent
// ======================================================

const callGemini = async (
  prompt,
  model = "gemini-2.5-flash"
) => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    // Clean Gemini Response
    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Try converting to JSON
    try {
      const jsonResponse = JSON.parse(cleanedText);

      return {
        success: true,
        data: jsonResponse,
      };
    } catch {
      // If response isn't valid JSON, return plain text
      return {
        success: true,
        data: cleanedText,
      };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);

    return {
      success: false,
      message: error.message || "Failed to generate AI response.",
    };
  }
};


// ======================================================
// Shopping Agent
// ======================================================

const shoppingAgent = async (userQuery) => {
  try {

    // Step 1 : Extract Budget
    const budget = extractBudget(userQuery);

    // Step 2 : Extract Category
    const category = extractCategory(userQuery);

    // Step 3 : Fetch Products
    const products = await fetchProducts(category, budget);

    // Step 4 : No Products Found
    if (products.length === 0) {
      return {
        success: false,
        agent: "Shopping Agent",
        message: "No matching products found.",
      };
    }

    // Step 5 : Build Prompt
    const prompt = buildShoppingPrompt(
      userQuery,
      products
    );

    // Step 6 : Gemini
    const aiResponse = await callGemini(prompt);

    if (!aiResponse.success) {
      return aiResponse;
    }

    // Step 7 : Final Response
    return {

      success: true,

      agent: "Shopping Agent",

      userQuery,

      extractedData: {
        budget,
        category,
      },

      totalProducts: products.length,

      products,

      recommendation: aiResponse.data,

    };

  } catch (error) {

    console.error("Shopping Agent Error:", error);

    return {

      success: false,

      agent: "Shopping Agent",

      message: error.message,

    };

  }
};

//========================================================================


// ======================================================
// Build Compare Prompt
// ======================================================

const buildComparePrompt = (product1, product2) => {
  return `
You are an AI Product Comparison Expert for ShopSphere.

Compare ONLY the two products given below.

--------------------------------------------------
PRODUCT 1
--------------------------------------------------

${JSON.stringify(product1, null, 2)}

--------------------------------------------------
PRODUCT 2
--------------------------------------------------

${JSON.stringify(product2, null, 2)}

--------------------------------------------------
YOUR TASK

Compare these products based on:

1. Price
2. Performance
3. Rating
4. Features
5. Value For Money

Choose the winner for each category.

Finally recommend ONE product.

--------------------------------------------------

Return ONLY valid JSON.

{
  "priceWinner":"",
  "performanceWinner":"",
  "ratingWinner":"",
  "valueWinner":"",
  "overallWinner":"",
  "summary":""
}
`;
};
// ======================================================
// Compare Agent
// ======================================================

const compareAgent = async (productId1, productId2) => {
  try {

    const product1 = await Product.findById(productId1)
      .select("name brand category price rating stock description image");

    const product2 = await Product.findById(productId2)
      .select("name brand category price rating stock description image");

    if (!product1 || !product2) {
      return {
        success: false,
        agent: "Compare Agent",
        message: "One or both products not found.",
      };
    }

    const prompt = buildComparePrompt(product1, product2);

    const aiResponse = await callGemini(prompt);

    if (!aiResponse.success) {
      return aiResponse;
    }

    return {
      success: true,
      agent: "Compare Agent",
      comparedProducts: [
        product1,
        product2,
      ],
      comparison: aiResponse.data,
    };

  } catch (error) {

    console.error("Compare Agent Error:", error);

    return {
      success: false,
      agent: "Compare Agent",
      message: error.message,
    };

  }
};

// ======================================================
// Build Cart Prompt
// ======================================================

const buildCartPrompt = (cartItems, totalAmount) => {
  return `
You are ShopSphere AI Cart Optimization Agent.

Your responsibility is to help customers optimize their shopping cart.

--------------------------------------------------
CART ITEMS
--------------------------------------------------

${JSON.stringify(cartItems, null, 2)}

--------------------------------------------------
TOTAL CART VALUE

₹${totalAmount}

--------------------------------------------------
YOUR TASK

1. Suggest useful accessories.

2. Suggest bundle opportunities.

3. Suggest one coupon.

4. Suggest how customer can save money.

5. Give one final recommendation.

--------------------------------------------------

Return ONLY valid JSON.

{
  "recommendedAccessories": [],
  "bundleSuggestion": "",
  "bestCoupon": "",
  "estimatedSavings": "",
  "finalRecommendation": ""
}
`;
};

// ======================================================
// Cart Agent
// ======================================================

const cartAgent = async (userId) => {
  try {

    // Find User Cart
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.product",
        select:
          "name brand category price rating description image",
      });

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        agent: "Cart Agent",
        message: "Cart is empty.",
      };
    }

    // Prepare Cart Data
    const cartItems = cart.items.map((item) => ({
      product: item.product.name,
      category: item.product.category,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Calculate Total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Build Prompt
    const prompt = buildCartPrompt(
      cartItems,
      totalAmount
    );

    // Call Gemini
    const aiResponse = await callGemini(prompt);

    if (!aiResponse.success) {
      return aiResponse;
    }

    return {
      success: true,
      agent: "Cart Agent",
      cartItems,
      totalAmount,
      suggestions: aiResponse.data,
    };

  } catch (error) {

    console.error("Cart Agent Error:", error);

    return {
      success: false,
      agent: "Cart Agent",
      message: error.message,
    };

  }
};

// ======================================================
// Build Support Prompt
// ======================================================

const buildSupportPrompt = (
  userQuery,
  orders
) => {

  return `
You are ShopSphere AI Support Agent.

You are a customer support executive.

Answer ONLY using the information provided.

--------------------------------------------------
CUSTOMER QUESTION

${userQuery}

--------------------------------------------------
CUSTOMER ORDERS

${JSON.stringify(orders, null, 2)}

--------------------------------------------------
SHOPSPHERE POLICIES

Return Policy:
Customers can return products within 7 days.

Refund:
Refunds are processed within 5-7 business days.

Delivery:
Standard delivery takes 3-5 days.

Warranty:
Electronic products include a 1-year warranty.

Payment:
UPI
Credit Card
Debit Card
Cash on Delivery

--------------------------------------------------

YOUR TASK

Answer politely.

If the customer asks about order status,
use the order information.

If they ask about policies,
use ONLY the above policies.

If information is unavailable,
say you don't have enough information.

Return ONLY JSON.

{
   "answer":""
}
`;
};
// ======================================================
// Support Agent
// ======================================================

const supportAgent = async (
  userId,
  userQuery
) => {

  try {

    const orders = await Order.find({
      user: userId
    })
      .sort({
        createdAt: -1
      })
      .limit(5)
      .populate(
        "items.product",
        "name"
      );

    const formattedOrders = orders.map(order => ({

      orderId: order._id,

      status: order.status,

      totalAmount: order.totalAmount,

      orderDate: order.createdAt,

      products: order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity
      }))

    }));

    const prompt = buildSupportPrompt(
      userQuery,
      formattedOrders
    );

    const aiResponse = await callGemini(prompt);

    if (!aiResponse.success) {
      return aiResponse;
    }

    return {

      success: true,

      agent: "Support Agent",

      answer: aiResponse.data,

    };

  } catch (error) {

    console.error(error);

    return {

      success: false,

      agent: "Support Agent",

      message: error.message,

    };

  }

};

// ======================================================
// Exports
// ======================================================

module.exports = {
  shoppingAgent,
  compareAgent,
  cartAgent,
  supportAgent,
};

