const router = require('express').Router();
const eventManagerController = require('../controllers/eventManager.controller');
const auth = require('../middleware/auth')();
const fileuploder = require("../helper/fileUpload");
const fileUpload = new fileuploder({ folderName: "uploads", supportedFiles: ["image/png", "image/jpg", "image/jpeg", "image/avif"], maxSize: 10 * 1024 * 1024 });

router.post(
  '/createEventManager',
  fileUpload.upload().fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'previousWorkImages', maxCount: 10 }
  ]),
  eventManagerController.createEventManager
);
router.put(
  '/updateEventManager',
  auth.authenticate,
  fileUpload.upload().fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'previousWorkImages', maxCount: 10 }
  ]),
  eventManagerController.updateEventManager
);
router.get('/getEventManager/:id', eventManagerController.getEventManagerFullDetails);

module.exports = router;