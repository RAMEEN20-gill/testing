const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const { getIO } = require("../socket/socket");

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    title,
    description,
    user: req.user.id,
    owner: req.user.id, // Important for task sharing
  });

  const io = getIO();
  io.emit("taskCreated", task);

  res.status(201).json(task);
});

// @desc    Get all tasks owned by user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id });
  res.json(tasks);
});

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if user is owner or in sharedWith
  if (
    task.owner.toString() !== req.user.id &&
    !task.sharedWith.includes(req.user.id)
  ) {
    res.status(401);
    throw new Error("Not authorized to view this task");
  }

  res.json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to update this task");
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updatedTask = await task.save();

  const io = getIO();
  io.emit("taskUpdated", updatedTask);

  res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this task");
  }

  await task.remove();

  const io = getIO();
  io.emit("taskDeleted", { id: req.params.id });

  res.json({ message: "Task removed" });
});

// @desc    Share task with other users
// @route   PUT /api/tasks/:id/share
// @access  Private
const shareTask = asyncHandler(async (req, res) => {
  const { userIds } = req.body; // Expecting array of userIds to share with
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.owner.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Only the owner can share the task");
  }

  // Avoid duplicates using Set
  const updatedSharedWith = new Set([...task.sharedWith, ...userIds]);
  task.sharedWith = [...updatedSharedWith];

  await task.save();

  const io = getIO();
  userIds.forEach((id) => io.to(id).emit("taskShared", task));

  res.json({ message: "Task shared successfully", task });
});

// @desc    Get tasks shared with user
// @route   GET /api/tasks/shared
// @access  Private
const getSharedTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ sharedWith: req.user.id });
  res.json(tasks);
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  shareTask,
  getSharedTasks,
};
