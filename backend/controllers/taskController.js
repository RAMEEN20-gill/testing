const mongoose = require('mongoose');

exports.shareTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIdToShare } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userIdToShare)) {
      return res.status(400).json({ message: 'Invalid user ID to share with.' });
    }

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the owner can share this task.' });
    }

    if (!task.sharedWith.includes(userIdToShare)) {
      task.sharedWith.push(userIdToShare);
      await task.save();
    }

    res.json({ message: 'Task shared successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
