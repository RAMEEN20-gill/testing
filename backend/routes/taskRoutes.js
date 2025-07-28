const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask,
  getSharedTasks
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.put("/:id/share", protect, shareTask);
router.get("/shared", protect, getSharedTasks);

module.exports = router;
