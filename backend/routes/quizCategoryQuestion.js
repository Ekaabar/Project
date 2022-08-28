const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const quizCategoryQuestionCtrl = require('../controllers/quizCategoryQuestion');

router.get('/', quizCategoryQuestionCtrl.getAll);
router.get('/category/:id', quizCategoryQuestionCtrl.getAllByCategory);
router.post('/', auth, multer, quizCategoryQuestionCtrl.create);
router.get('/:id', quizCategoryQuestionCtrl.getOne);
router.put('/:id', auth, multer, quizCategoryQuestionCtrl.modify);
router.delete('/:id', auth, quizCategoryQuestionCtrl.delete);

module.exports = router;