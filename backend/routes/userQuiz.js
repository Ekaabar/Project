const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userQuizCtrl = require('../controllers/userQuiz');

router.post('/u/', userQuizCtrl.create);
router.put('/u/:id', multer, userQuizCtrl.modify);

router.get('/u/info', userQuizCtrl.getInfoByUser);

router.get('/', userQuizCtrl.getAll);
router.post('/', auth, multer, userQuizCtrl.create);
router.get('/findone', userQuizCtrl.getFindOne);
router.get('/:id', userQuizCtrl.getOne);
router.put('/:id', auth, userQuizCtrl.modify);
router.delete('/:id', auth, userQuizCtrl.delete);

module.exports = router;