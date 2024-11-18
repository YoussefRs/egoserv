const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path")
const candidateController = require("../controller/candidateController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  
  const upload = multer({ storage: storage });


router.post('/submit', upload.single('document'), candidateController.submitForm);

module.exports = router;