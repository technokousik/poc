// exports.getDashboardStats = (req, res) => {
//   res.status(200).json({ message: 'Dashboard stats route ready' });
// };


const {
  getDashboardData,
} = require("../services/dashboardService");

exports.dashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardData();

    res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};