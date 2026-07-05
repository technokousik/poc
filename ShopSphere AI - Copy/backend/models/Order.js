// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
//   totalAmount: Number,
//   status: { type: String, default: 'pending' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

items:[
{

product:{
type:mongoose.Schema.Types.ObjectId,
ref:"Product"
},

quantity:Number

}
],

totalAmount:Number,

status: {
    type: String,

    enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ],

    default: "Pending"
}

},
{
timestamps:true
});

module.exports=mongoose.model("Order",orderSchema);