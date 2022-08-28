const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');
const quizCtrl = require('../controllers/quiz');

router.get('/', quizCtrl.getAll);
router.post('/', auth, multer, quizCtrl.create);
router.get('/:id', quizCtrl.getOne);
router.put('/:id', auth, quizCtrl.modify);
router.delete('/:id', auth, quizCtrl.delete);

module.exports = router;