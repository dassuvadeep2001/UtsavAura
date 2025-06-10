const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth')();

router.post('/createCategory',auth.adminAuthenticate, categoryController.createCategory);
router.get('/getAllCategories',categoryController.getCategory);
router.get('/categoryWiseEventManagers/:categoryId', categoryController.categoryWiseEventManager);
module.exports = router;