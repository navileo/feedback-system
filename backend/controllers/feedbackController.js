const Feedback = require('../models/Feedback');
const User = require('../models/User');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private/Student
const submitFeedback = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getFacultyForFeedback = async (req, res) => {
  try {
    const faculty = await User.find({ role: 'faculty' }).select('name email department');
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty for feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitFeedback, getFacultyForFeedback };
