const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const quizCategoryCtrl = require('../controllers/quizCategory');

router.get('/', quizCategoryCtrl.getAll);
router.get('/quiz/:quiz_id', quizCategoryCtrl.getAllByQuiz);
router.post('/', auth, multer, quizCategoryCtrl.create);
router.get('/:id', quizCategoryCtrl.getOne);
router.put('/:id', auth, multer, quizCategoryCtrl.modify);
router.delete('/:id', auth, quizCategoryCtrl.delete);

module.exports = router;