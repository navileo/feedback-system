const express = require('express');
const router = express.Router();
const { submitFeedback, getFacultyForFeedback } = require('../controllers/feedbackController');
const { protect, student } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', student, submitFeedback);
router.get('/faculty', student, getFacultyForFeedback);

module.exports = router;
