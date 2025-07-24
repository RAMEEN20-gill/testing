const Task = require("../models/taskModel");

// GET /analytics/overview
const getAnalyticsOverview = async (req, res) => {
  const totalTasks = await Task.countDocuments({ owner: req.user._id });
  const completedTasks = await Task.countDocuments({ owner: req.user._id, status: "completed" });
  const pendingTasks = totalTasks - completedTasks;

  res.json({ totalTasks, completedTasks, pendingTasks });
};

// GET /analytics/trends
const getAnalyticsTrends = async (req, res) => {
  const trends = await Task.aggregate([
    { $match: { owner: req.user._id } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(trends);
};

module.exports = {
  getAnalyticsOverview,
  getAnalyticsTrends,
};
