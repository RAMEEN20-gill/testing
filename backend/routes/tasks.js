const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');
const Notification = require('../models/notifications');
const User = require('../models/user'); // Needed to look up by username & email
const authMiddleware = require('./auth');

const router = express.Router();

// Validation rules
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed'])
];

// Create a new task (with owner)
router.post('/', authMiddleware, validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get all tasks owned by user (with pagination + filtering)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search = '', status } = req.query;

    const query = { owner: req.user.id };
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query).skip(skip).limit(limit);
    const total = await Task.countDocuments(query);
    const completed = await Task.countDocuments({ ...query, status: 'Completed' });

    res.json({
      tasks,
      total,
      completed,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get tasks shared with the user
router.get("/shared", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ sharedWith: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Share task with user using username and email
router.put("/:id/share", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.owner) !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

    // Find the user by both username and email
    const userToShare = await User.findOne({ username, email });
    if (!userToShare) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add user to sharedWith array if not already added
    if (!task.sharedWith.includes(userToShare._id)) {
      task.sharedWith.push(userToShare._id);
      await task.save();

      // Create and emit notification
      const note = new Notification({
        user: userToShare._id,
        message: `A task was shared with you: "${task.title}"`,
      });
      await note.save();
      req.io?.to(userToShare._id.toString()).emit("notification", note);
    }

    res.json({ message: "✅ Task shared successfully!" });
  } catch (err) {
    console.error("Share Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update task (status, title, etc.)
router.put('/:id', authMiddleware, validateTask, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (String(task.owner) !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    Object.assign(task, req.body);
    await task.save();

    // Notify shared users if status changed
    if (req.body.status) {
      for (let id of task.sharedWith) {
        const note = new Notification({
          user: id,
          message: `Task "${task.title}" status updated to ${task.status}`,
        });
        await note.save();
        req.io?.to(id).emit('notification', note);
      }
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (String(task.owner) !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await task.remove();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
