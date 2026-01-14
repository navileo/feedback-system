const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new User({
      name: 'System Admin',
      email: 'admin@feedback.com',
      password: 'adminpassword123',
      role: 'admin',
      department: 'Administration'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@feedback.com');
    console.log('Password: adminpassword123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
