const Feedback = require('../models/Feedback');
const User = require('../models/User');

// @desc    Get feedback for specific faculty
// @route   GET /api/faculty/feedback
// @access  Private/Faculty
const getFacultyFeedback = async (req, res) => {
  const feedback = await Feedback.find({ faculty: req.user._id })
    .populate('student', 'name email');
  res.json(feedback);
};

// @desc    Get faculty profile
// @route   GET /api/faculty/profile
// @access  Private/Faculty
const getFacultyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Faculty not found' });
    }
  } catch (error) {
    console.error('Error fetching faculty profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update faculty profile
// @route   PUT /api/faculty/profile
// @access  Private/Faculty
const updateFacultyProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.department = req.body.department || user.department;
    user.contact = req.body.contact || user.contact;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      department: updatedUser.department,
      contact: updatedUser.contact,
      profilePicture: updatedUser.profilePicture
    });
  } else {
    res.status(404).json({ message: 'Faculty not found' });
  }
};

module.exports = { getFacultyFeedback, getFacultyProfile, updateFacultyProfile };
