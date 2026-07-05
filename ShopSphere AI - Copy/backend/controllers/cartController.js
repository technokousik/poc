// exports.getCart = (req, res) => {
//   res.status(200).json({ message: 'Cart route ready' });
// };

// exports.addToCart = (req, res) => {
//   res.status(201).json({ message: 'Add to cart route ready' });
// };


//1️⃣ Add to Cart
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add Item
// ===============================
// Add Product To Cart
// ===============================

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate Input
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product ID and quantity.",
      });
    }

    // Check if Product Exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    // Find User Cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // Create Cart if it doesn't exist
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    // Check if Product Already Exists in Cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Increase Quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add New Product
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    // Save Cart
    await cart.save();

    // Populate Product Details
    await cart.populate("items.product");

    // Calculate Total Items
    const totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Calculate Subtotal
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Response
    res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      cart: {
        items: cart.items,
        totalItems,
        subtotal,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//2️⃣ Get Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
          totalItems: 0,
          subtotal: 0,
        },
      });
    }

    // Calculate total quantity
    const totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Calculate subtotal
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      success: true,
      cart: {
        items: cart.items,
        totalItems,
        subtotal,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//3️⃣ Update Quantity
exports.updateCart = async(req,res)=>{

try{

const {quantity}=req.body;

const cart=await Cart.findOne({
user:req.user._id
});

const item=cart.items.find(
i=>i.product.toString()==req.params.productId
);

item.quantity=quantity;

await cart.save();

res.json({
success:true,
message:"Cart Updated",
cart
});

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

}

//4️⃣ Remove Item
exports.removeFromCart=async(req,res)=>{

try{

const cart=await Cart.findOne({
user:req.user._id
});

cart.items=cart.items.filter(
item=>item.product.toString()!=req.params.productId
);

await cart.save();

res.json({
success:true,
message:"Item Removed",
cart
});

}

catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

}