// exports.createOrder = (req, res) => {
//   res.status(201).json({ message: 'Create order route ready' });
// };

// exports.getOrders = (req, res) => {
//   res.status(200).json({ message: 'Get orders route ready' });
// };


const Cart=require("../models/Cart");
const Order=require("../models/Order");

exports.placeOrder=async(req,res)=>{

try{

const cart=await Cart.findOne({
user:req.user._id
}).populate("items.product");

if(!cart||cart.items.length===0){

return res.status(400).json({

success:false,

message:"Cart Empty"

});

}

let total=0;

cart.items.forEach(item=>{

total+=item.product.price*item.quantity;

});

const order=await Order.create({

user:req.user._id,

items:cart.items,

totalAmount:total

});

cart.items=[];

await cart.save();

res.json({

success:true,

message:"Order Placed Successfully",

order

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};


//Order History
exports.getOrders=async(req,res)=>{

try{

const orders=await Order.find({

user:req.user._id

}).populate("items.product");

res.json({

success:true,

orders

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};