// const express = require('express');
// const { createOrder, getOrders } = require('../controllers/orderController');

// const router = express.Router();

// router.post('/', createOrder);
// router.get('/', getOrders);

// module.exports = router;


const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const{

placeOrder,

getOrders

}=require("../controllers/orderController");

router.post("/",protect,placeOrder);

router.get("/",protect,getOrders);

module.exports=router;