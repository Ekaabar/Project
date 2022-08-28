const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const quizCategoryQuestionChildCtrl = require('../controllers/quizCategoryQuestionChild');

router.get('/', quizCategoryQuestionChildCtrl.getAll);
router.post('/', auth, multer, quizCategoryQuestionChildCtrl.create);
router.get('/question/:quest_id', quizCategoryQuestionChildCtrl.getAllByQuestion);
router.get('/:id', quizCategoryQuestionChildCtrl.getOne);
router.put('/:id', auth, multer, quizCategoryQuestionChildCtrl.modify);
router.delete('/:id', auth, quizCategoryQuestionChildCtrl.delete);

module.exports = router;

