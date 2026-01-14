const User = require('../models/User');

// @desc    Get student profile
// @route   GET /api/student/profile
// @access  Private/Student
const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private/Student
const updateStudentProfile = async (req, res) => {
  try {
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
        studentId: updatedUser.studentId,
        department: updatedUser.department,
        contact: updatedUser.contact,
        profilePicture: updatedUser.profilePicture
      });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

module.exports = { getStudentProfile, updateStudentProfile };
