const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// 1. Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('DB connection error:', err));

// 2. Create dummy user
const createUser = async () => {
  try {
    const email = 'test@example.com';
    const password = 'test123';

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Dummy user already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: 'Test User',
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log('✅ Dummy user created:', { email, password });
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createUser();
