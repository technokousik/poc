// const express = require('express');
// const { getCart, addToCart } = require('../controllers/cartController');

// const router = express.Router();

// router.get('/', getCart);
// router.post('/', addToCart);

// module.exports = router;


const express=require("express");

const router=express.Router();

const protect=require("../middleware/authMiddleware");

const{

addToCart,
getCart,
updateCart,
removeFromCart

}=require("../controllers/cartController");

router.post("/",protect,addToCart);

router.get("/",protect,getCart);

router.put("/:productId",protect,updateCart);

router.delete("/:productId",protect,removeFromCart);

module.exports=router;