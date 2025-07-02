const router = require('express').Router();
const logControl = require('../controllers/logControl');
const signControl = require('../controllers/signControl');

router.post('/login', logControl);
router.post('/signin', signControl);

module.exports = router;