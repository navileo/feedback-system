const express = require('express');
const router = express.Router();
const { getStudentProfile, updateStudentProfile } = require('../controllers/studentController');
const { protect, student } = require('../middleware/authMiddleware');

router.use(protect);
router.use(student);

router.route('/profile').get(getStudentProfile).put(updateStudentProfile);

module.exports = router;
