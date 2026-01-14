const express = require('express');
const router = express.Router();
const { getFacultyFeedback, getFacultyProfile, updateFacultyProfile } = require('../controllers/facultyController');
const { protect, faculty } = require('../middleware/authMiddleware');

router.use(protect);
router.use(faculty);

router.get('/feedback', getFacultyFeedback);
router.route('/profile').get(getFacultyProfile).put(updateFacultyProfile);

module.exports = router;
