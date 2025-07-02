const router = require('express').Router();
const allPostControl = require('../controllers/allPostControl');
const deleteControl = require('../controllers/deleteControl');
const likeControl = require('../controllers/likeControl');
const likePostControl = require('../controllers/likePostControl');
const upPostControl = require('../controllers/upPostControl');
const userPostControl = require('../controllers/userPostControl');

const auth = require('../middleware/auth');
const fileupload = require('../middleware/fileupload');

router.get('/allpost',auth, allPostControl);
router.post('/uploadpost', auth, fileupload.single('image'), upPostControl);
router.get('/myposts', auth, userPostControl);
router.patch('/like/:id', auth, likeControl);
router.get('/likeposts', auth, likePostControl);
router.delete('/delete/:id', auth, deleteControl);

module.exports = router;