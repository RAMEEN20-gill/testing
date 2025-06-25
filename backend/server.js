// server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app'); // ⬅️ Import the Express app

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
  });
