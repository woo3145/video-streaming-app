const express = require('express');
const router = express.Router();
const path = require('path');

// 썸네일 파일 전송
router.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  const imagePath = path.join(__dirname, '../thumbnail', fileName);
  res.sendFile(imagePath);
});

module.exports = router;
