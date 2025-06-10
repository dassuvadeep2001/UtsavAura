const router= require('express').Router();
const authController = require('../controllers/user.controller');
const auth= require('../middleware/auth')()
const multer = require("../helper/fileUpload");
const fileUpload = new multer({ folderName: "uploads", supportedFiles: ["image/png", "image/jpg", "image/jpeg", "image/avif"], maxSize: 10 * 1024 * 1024 });

router.post('/register', fileUpload.upload().single('profileImage'), authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forget-password', authController.forgetPassword);
router.post('/reset-password/:id', authController.resetPassword);
router.get('/profile', auth.authenticate, authController.profile);
router.put('/update-profile', auth.authenticate, fileUpload.upload().single('profileImage'), authController.updateProfile);
router.delete('/delete-profile', auth.authenticate, authController.deleteProfile);
router.get('/getAllUsers', auth.adminAuthenticate, authController.getAllUsers);
router.get('/emailCheck', authController.getUserByEmail);
module.exports = router;