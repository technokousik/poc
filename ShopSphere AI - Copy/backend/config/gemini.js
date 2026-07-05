// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";

// const result = dotenv.config();

// console.log(result);
// console.log("Gemini API KEY:", process.env.API_KEY);
// //dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.API_KEY,
// });

// export default ai;

//-------------------------------------------------------------------------------------------
// const { GoogleGenAI } = require("@google/genai");
// const dotenv = require("dotenv");

// dotenv.config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.API_KEY,
// });

// module.exports = ai;

//---------------------------------------------------------------------------------------------

const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

module.exports = ai;