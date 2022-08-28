const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const quizCategoryQuestionOptionCtrl = require('../controllers/quizCategoryQuestionOption');

router.get('/', quizCategoryQuestionOptionCtrl.getAll);
router.get('/question/:quest_id', quizCategoryQuestionOptionCtrl.getAllByQuestion);
router.post('/', auth, multer, quizCategoryQuestionOptionCtrl.create);
router.get('/:id', quizCategoryQuestionOptionCtrl.getOne);
router.put('/:id', auth, quizCategoryQuestionOptionCtrl.modify);
router.delete('/:id', auth, quizCategoryQuestionOptionCtrl.delete);

module.exports = router;