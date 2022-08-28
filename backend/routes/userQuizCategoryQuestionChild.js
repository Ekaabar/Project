const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userQuizCategoryQuestionChildCtrl = require('../controllers/userQuizCategoryQuestionChild');

router.get('/', userQuizCategoryQuestionChildCtrl.getAll);
router.post('/', auth, multer, userQuizCategoryQuestionChildCtrl.create);
router.post('/u/', multer, userQuizCategoryQuestionChildCtrl.create);
router.put('/u/:id', authUser, multer, userQuizCategoryQuestionChildCtrl.modify);
router.get('/:id', userQuizCategoryQuestionChildCtrl.getOne);
router.put('/:id', auth, multer, userQuizCategoryQuestionChildCtrl.modify);
router.delete('/:id', auth, userQuizCategoryQuestionChildCtrl.delete);

module.exports = router;