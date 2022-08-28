const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userQuizCategoryCtrl = require('../controllers/userQuizCategory');

router.post('/u/', multer, userQuizCategoryCtrl.create);
router.put('/u/:id', multer, userQuizCategoryCtrl.modify);
router.get('/infos', userQuizCategoryCtrl.getInfosAll);

router.get('/', userQuizCategoryCtrl.getAll);
router.post('/', auth, userQuizCategoryCtrl.create);
router.get('/findone', userQuizCategoryCtrl.getFindOne);
router.get('/:id', userQuizCategoryCtrl.getOne);
router.put('/:id', auth, userQuizCategoryCtrl.modify);
router.delete('/:id', auth, userQuizCategoryCtrl.delete);

module.exports = router;