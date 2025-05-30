const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth')();

router.post('/createCategory',auth.adminAuthenticate, categoryController.createCategory);
router.get('/getAllCategories',auth.authenticate, categoryController.getCategory);
router.get('/categoryWiseEventManagers/:categoryId',auth.authenticate, categoryController.categoryWiseEventManager);
module.exports = router;