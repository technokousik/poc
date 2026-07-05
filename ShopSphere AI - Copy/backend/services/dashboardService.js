// const getStats = async () => {
//   return {
//     totalUsers: 0,
//     totalOrders: 0,
//     totalRevenue: 0
//   };
// };

// module.exports = { getStats };


const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardData = async () => {
  // ==============================
  // Dashboard Overview
  // ==============================

  const [
    totalProducts,
    totalOrders,
    totalCustomers,
    revenue,
  ] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: "customer" }),

    Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]),
  ]);

  const totalRevenue =
    revenue.length > 0 ? revenue[0].totalRevenue : 0;

  // ==============================
  // Order Status
  // ==============================

  const [
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  ] = await Promise.all([
    Order.countDocuments({ status: "Pending" }),
    Order.countDocuments({ status: "Processing" }),
    Order.countDocuments({ status: "Shipped" }),
    Order.countDocuments({ status: "Delivered" }),
    Order.countDocuments({ status: "Cancelled" }),
  ]);

  // ==============================
  // Inventory
  // ==============================

  const [
    lowStockProducts,
    outOfStockProducts,
  ] = await Promise.all([
    Product.countDocuments({
      stock: {
        $gt: 0,
        $lte: 5,
      },
    }),

    Product.countDocuments({
      stock: 0,
    }),
  ]);

  // ==============================
  // Recent Orders
  // ==============================

  const recentOrders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(5);

  // ==============================
  // Top Selling Products
  // ==============================

  const topProducts = await Order.aggregate([
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        totalSold: {
          $sum: "$items.quantity",
        },
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  await Product.populate(topProducts, {
    path: "_id",
    select: "name price image stock category",
  });

  // ==============================
  // Monthly Revenue
  // ==============================

  const monthlyRevenue = await Order.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },
        revenue: {
          $sum: "$totalAmount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  // ==============================
  // Recent Activity
  // ==============================

  const recentActivity = [];

  // Latest Orders
  recentOrders.forEach((order) => {
    recentActivity.push({
      type: "ORDER",
      message: `New order placed by ${order.user?.name || "Customer"}`,
      date: order.createdAt,
    });
  });

  // Low Stock Products
  const lowStockItems = await Product.find({
    stock: {
      $gt: 0,
      $lte: 5,
    },
  })
    .select("name stock")
    .limit(5);

  lowStockItems.forEach((product) => {
    recentActivity.push({
      type: "LOW_STOCK",
      message: `${product.name} has only ${product.stock} item(s) left`,
      date: new Date(),
    });
  });

  // Sort Activity
  recentActivity.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ==============================
  // Final Dashboard Response
  // ==============================

  return {
    overview: {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
    },

    orderStats: {
      pending: pendingOrders,
      processing: processingOrders,
      shipped: shippedOrders,
      delivered: deliveredOrders,
      cancelled: cancelledOrders,
    },

    inventory: {
      lowStockProducts,
      outOfStockProducts,
    },

    recentOrders,

    topProducts,

    monthlyRevenue,

    recentActivity,
  };
};

module.exports = {
  getDashboardData,
};