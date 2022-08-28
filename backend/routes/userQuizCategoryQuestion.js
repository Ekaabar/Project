const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userQuizCategoryQuestionCtrl = require('../controllers/userQuizCategoryQuestion');

router.get('/findone', userQuizCategoryQuestionCtrl.getFindOne);
router.get('/infos', userQuizCategoryQuestionCtrl.getInfosAll);
router.get('/', userQuizCategoryQuestionCtrl.getAll);
router.post('/u/', multer, userQuizCategoryQuestionCtrl.create);
router.put('/u/:id', multer, userQuizCategoryQuestionCtrl.userModify);
router.post('/', auth, multer, userQuizCategoryQuestionCtrl.create);
router.get('/:id', userQuizCategoryQuestionCtrl.getOne);
router.put('/:id', auth, multer, userQuizCategoryQuestionCtrl.modify);
router.delete('/:id', auth, userQuizCategoryQuestionCtrl.delete);

module.exports = router;