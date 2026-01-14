const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload an image' });
  }
  res.json({
    message: 'Image uploaded successfully',
    url: `/${req.file.path.replace(/\\/g, '/')}`
  });
});

module.exports = router;
