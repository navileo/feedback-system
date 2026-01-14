const User = require('../models/User');
const Feedback = require('../models/Feedback');

// @desc    Get all faculty
// @route   GET /api/admin/faculty
// @access  Private/Admin
const getFaculty = async (req, res) => {
  const faculty = await User.find({ role: 'faculty' });
  res.json(faculty);
};

// @desc    Add new faculty
// @route   POST /api/admin/faculty
// @access  Private/Admin
const addFaculty = async (req, res) => {
  try {
    const { name, email, password, facultyId, department, contact } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const faculty = await User.create({
      name,
      email,
      password,
      role: 'faculty',
      facultyId,
      department,
      contact
    });

    if (faculty) {
      res.status(201).json(faculty);
    } else {
      res.status(400).json({ message: 'Invalid faculty data' });
    }
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update faculty
// @route   PUT /api/admin/faculty/:id
// @access  Private/Admin
const updateFaculty = async (req, res) => {
  const faculty = await User.findById(req.params.id);

  if (faculty && faculty.role === 'faculty') {
    faculty.name = req.body.name || faculty.name;
    faculty.email = req.body.email || faculty.email;
    faculty.department = req.body.department || faculty.department;
    faculty.contact = req.body.contact || faculty.contact;
    faculty.facultyId = req.body.facultyId || faculty.facultyId;

    if (req.body.password) {
      faculty.password = req.body.password;
    }

    const updatedFaculty = await faculty.save();
    res.json(updatedFaculty);
  } else {
    res.status(404).json({ message: 'Faculty not found' });
  }
};

// @desc    Delete faculty
// @route   DELETE /api/admin/faculty/:id
// @access  Private/Admin
const deleteFaculty = async (req, res) => {
  const faculty = await User.findById(req.params.id);

  if (faculty && faculty.role === 'faculty') {
    await faculty.deleteOne();
    res.json({ message: 'Faculty removed' });
  } else {
    res.status(404).json({ message: 'Faculty not found' });
  }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private/Admin
const getStudents = async (req, res) => {
  const students = await User.find({ role: 'student' });
  res.json(students);
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private/Admin
const getAdminProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private/Admin
const updateAdminProfile = async (req, res) => {
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
        department: updatedUser.department,
        contact: updatedUser.contact,
        profilePicture: updatedUser.profilePicture
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add new student
// @route   POST /api/admin/students
// @access  Private/Admin
const addStudent = async (req, res) => {
  try {
    const { name, email, password, studentId, department, contact } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const student = await User.create({
      name,
      email,
      password,
      role: 'student',
      studentId,
      department,
      contact
    });

    if (student) {
      res.status(201).json(student);
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update student
// @route   PUT /api/admin/students/:id
// @access  Private/Admin
const updateStudent = async (req, res) => {
  const student = await User.findById(req.params.id);

  if (student && student.role === 'student') {
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.department = req.body.department || student.department;
    student.contact = req.body.contact || student.contact;
    student.studentId = req.body.studentId || student.studentId;

    if (req.body.password) {
      student.password = req.body.password;
    }

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

// @desc    Delete student
// @route   DELETE /api/admin/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  const student = await User.findById(req.params.id);

  if (student && student.role === 'student') {
    await student.deleteOne();
    res.json({ message: 'Student removed' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
};

// @desc    Get all feedback
// @route   GET /api/admin/feedback
// @access  Private/Admin
const getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find({})
    .populate('student', 'name email')
    .populate('faculty', 'name email department');
  res.json(feedback);
};

module.exports = {
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getAllFeedback,
  getAdminProfile,
  updateAdminProfile
};
