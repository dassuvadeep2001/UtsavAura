const router= require('express').Router();
const queryController = require('../controllers/query.controller');
const auth= require('../middleware/auth')();

router.post('/createQuery', queryController.submitQuery);
router.get('/getQueries', auth.adminAuthenticate, queryController.getQueries);

module.exports = router;