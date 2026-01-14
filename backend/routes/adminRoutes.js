const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

router.route('/profile').get(getAdminProfile).put(updateAdminProfile);

router.get('/faculty', getFaculty);
router.post('/faculty', addFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

router.get('/students', getStudents);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

router.get('/feedback', getAllFeedback);

module.exports = router;
