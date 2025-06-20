const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth')();

router.post('/createCategory',auth.adminAuthenticate, categoryController.createCategory);
router.get('/getAllCategories',categoryController.getCategory);
router.delete('/deleteCategory/:id',auth.adminAuthenticate, categoryController.deleteCategory);
router.put('/updateCategory/:id', auth.adminAuthenticate, categoryController.editCategory);
router.get('/categoryWiseEventManagers/:categoryId', categoryController.categoryWiseEventManager);
module.exports = router;