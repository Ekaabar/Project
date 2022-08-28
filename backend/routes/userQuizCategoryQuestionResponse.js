const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userQuizCategoryQuestionResponseCtrl = require('../controllers/userQuizCategoryQuestionResponse');

router.get('/', auth, userQuizCategoryQuestionResponseCtrl.getAll);
router.post('/', auth, multer, userQuizCategoryQuestionResponseCtrl.create);
router.get('/:id', auth, userQuizCategoryQuestionResponseCtrl.getOne);
router.put('/:id', auth, userQuizCategoryQuestionResponseCtrl.modify);
router.delete('/:id', auth, userQuizCategoryQuestionResponseCtrl.delete);

module.exports = router;