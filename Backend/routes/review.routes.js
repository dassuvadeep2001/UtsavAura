const router = require('express').Router(); 
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth')();

router.post('/addReview/:eventManagerId', auth.authenticate, reviewController.addReview);
router.get('/getReviews', reviewController.getReviews);

module.exports = router;