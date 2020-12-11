const express = require('express');
const router = express.Router();
const upload = require('../../modules/multer');
const bannerController = require('../../controller/bannerController');
const multerController = require('../../controller/multerController');


router.post('/upload', upload.single('image'), multerController.uploadImage);

// router.get();
router.get('/', bannerController.readAllBanner);

module.exports = router;
