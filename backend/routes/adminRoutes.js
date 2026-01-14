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

router.route('/faculty').get(getFaculty).post(addFaculty);
router.route('/faculty/:id').put(updateFaculty).delete(deleteFaculty);

router.route('/students').get(getStudents).post(addStudent);
router.route('/students/:id').put(updateStudent).delete(deleteStudent);

router.get('/feedback', getAllFeedback);

module.exports = router;
