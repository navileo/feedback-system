const Feedback = require('../models/Feedback');
const User = require('../models/User');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private/Student
const submitFeedback = async (req, res) => {
  const { facultyId, rating, comments } = req.body;

  const faculty = await User.findById(facultyId);

  if (!faculty || faculty.role !== 'faculty') {
    res.status(404).json({ message: 'Faculty not found' });
    return;
  }

  const feedback = await Feedback.create({
    student: req.user._id,
    faculty: facultyId,
    rating,
    comments
  });

  if (feedback) {
    res.status(201).json(feedback);
  } else {
    res.status(400).json({ message: 'Invalid feedback data' });
  }
};

// @desc    Get all faculty for feedback
// @route   GET /api/feedback/faculty
// @access  Private/Student
const getFacultyForFeedback = async (req, res) => {
  const faculty = await User.find({ role: 'faculty' }).select('name email department');
  res.json(faculty);
};

module.exports = { submitFeedback, getFacultyForFeedback };
