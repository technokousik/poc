
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Gemini Configuration
const ai = require("./config/gemini");

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Models
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 5000;


// Database Connection
connectDB();

// Middlewares
app.use(cors());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));
// ======================================================
// Home Route
// ======================================================

app.get("/", (req, res) => {
  res.send("🚀 ShopSphere AI Backend is Running...");
});

// ======================================================
// MongoDB Test Route
// ======================================================

app.get("/test", async (req, res) => {
  try {
    const user = await User.create({
      name: "Sudeshna",
      email: "sudeshna@gmail.com",
      password: "123456",
    });

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ======================================================
// Gemini API Test Route
// ======================================================

app.post("/test-api", async (req, res) => {
  try {
    console.log("========== GEMINI API TEST ==========");
    console.log("API KEY Loaded:", process.env.API_KEY ? "YES ✅" : "NO ❌");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello from ShopSphere AI",
    });

    console.log("Gemini Response Received");

    res.status(200).json({
      success: true,
      message: "Gemini API Connected Successfully 🚀",
      response: response.text,
    });

  } catch (error) {

    console.error("========== GEMINI ERROR ==========");
    console.dir(error, { depth: null });

    res.status(500).json({
      success: false,
      message: "Gemini API Connection Failed",
      error: error.message,
    });
  }
});

// ======================================================
// API Routes
// ======================================================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

// ======================================================
// Server
// ======================================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});