const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');
const taskController = require('../controllers/taskController');


const router = express.Router();
router.get('/', taskController.getAllTasks);

// Validation rules
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']),
];

// 1️⃣ Create a new task
router.post('/', validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = new Task(req.body);
    await task.save();
    const populatedTask = await Task.findById(task._id)
      .populate('owner', 'name email')
      .populate('sharedWith', 'name email');

    res.status(201).json(populatedTask);
  } catch (err) {
    console.error('Create Task Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2️⃣ Get all tasks (with pagination & filtering)
router.get('/', async (req, res) => {
   console.log('🔍 GET /api/tasks hit');
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { search = '', status } = req.query;

    const query = {};
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name email')
      .populate('sharedWith', 'name email');

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
    console.error('Fetch Tasks Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// 3️⃣ Update task
router.put('/:id', validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('owner', 'name email')
      .populate('sharedWith', 'name email');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Notify shared users on update
    const io = req.app.get('io');
    if (task.sharedWith && io) {
      const sockets = [...io.sockets.sockets.values()];
      task.sharedWith.forEach(user => {
        const targetSocket = sockets.find(s => s.userId === user._id.toString());
        if (targetSocket) {
          targetSocket.emit('notification', {
            message: `Task "${task.title}" has been updated.`,
          });
        }
      });
    }

    res.json(task);
  } catch (err) {
    console.error('Update Task Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 4️⃣ Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Delete Task Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// 5️⃣ Share task
router.put('/:id/share', async (req, res) => {
  const { id } = req.params;
  const { userIdToShareWith } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (!task.sharedWith.includes(userIdToShareWith)) {
      task.sharedWith.push(userIdToShareWith);
      await task.save();
    }

    const updatedTask = await Task.findById(task._id).populate('sharedWith', 'name email');
    res.json({ message: 'Task shared successfully', task: updatedTask });
  } catch (err) {
    console.error('Share Task Error:', err);
    res.status(500).json({ message: err.message });
  }
});

// 6️⃣ Get shared tasks for a user
router.get('/shared/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ sharedWith: userId })
      .populate('owner', 'name email')
      .populate('sharedWith', 'name email');

    res.json(tasks);
  } catch (err) {
    console.error('Get Shared Tasks Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
