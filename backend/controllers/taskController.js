const Task = require('../models/task');

exports.getAllTasks = async (req, res, next) => {
  try {
    console.log('📥 Incoming GET /api/tasks with query:', req.query);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const status = req.query.status;

    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    };

    if (status === 'completed') {
      query.completed = true;
    } else if (status === 'pending') {
      query.completed = false;
    }

    const total = await Task.countDocuments(query);
    const completed = await Task.countDocuments({ ...query, completed: true });

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      tasks,
      total,
      completed,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error('🔥 getAllTasks error:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.shareTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { userIdToShareWith } = req.body;

    // Check if the user exists
    const userToShareWith = await User.findById(userIdToShareWith);
    if (!userToShareWith) {
      return res.status(404).json({ message: "User to share with not found." });
    }

    // Update the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    // Prevent duplicate sharing
    if (task.sharedWith.includes(userIdToShareWith)) {
      return res.status(400).json({ message: "Task already shared with this user." });
    }

    task.sharedWith.push(userIdToShareWith);
    await task.save();

    res.status(200).json({ message: "Task shared successfully." });

  } catch (err) {
    console.error('❌ Error in shareTask:', err.message);
    res.status(500).json({ message: "Failed to share task." });
  }
};
