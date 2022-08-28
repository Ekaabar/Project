const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const quizCategoryQuestionOptionTypeCtrl = require('../controllers/quizCategoryQuestionOptionType');

router.get('/', quizCategoryQuestionOptionTypeCtrl.getAll);
router.post('/', auth, multer, quizCategoryQuestionOptionTypeCtrl.create);
router.get('/:id', quizCategoryQuestionOptionTypeCtrl.getOne);
router.put('/:id', auth, quizCategoryQuestionOptionTypeCtrl.modify);
router.delete('/:id', auth, quizCategoryQuestionOptionTypeCtrl.delete);

module.exports = router;