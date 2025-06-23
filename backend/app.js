const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', taskRoutes);


app.use(errorHandler);

// MongoDB connection — simplified without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
