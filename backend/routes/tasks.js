const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');

const router = express.Router();

// Validation rules
const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('status').optional().isIn(['Pending', 'In Progress', 'Completed'])
];

// Create a new task
router.post('/', validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ Get all tasks with pagination and filtering
router.get('/', async (req, res) => {
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


// Get single task
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update task
router.put('/:id', validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
