const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask,
  getSharedTasks,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.put("/:id/share", shareTask);
router.get("/shared", getSharedTasks);

module.exports = router;
