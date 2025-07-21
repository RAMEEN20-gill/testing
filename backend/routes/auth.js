const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Example user database (replace with real one if needed)
const users = [
  { id: 1, username: 'user1', password: 'pass123' },
  { id: 2, username: 'user2', password: 'pass456' }
];

// LOGIN route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;
