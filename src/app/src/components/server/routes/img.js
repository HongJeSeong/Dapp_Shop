const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

fs.readdir('uploads', (error) => {
    if (error) {
        fs.mkdirSync('uploads');
    }
})

const upload = multer({
  storage: multer.diskStorage({
    // set a localstorage destination
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    // convert a file name
    filename: (req, file, cb) => {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});
router.post('/upload', upload.single('file'), (req, res) => {
	res.set({'access-control-allow-origin':'*'});
        res.json({ imgPath : `/uploads/${req.file.filename}`});
})

module.exports = router;
