const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authUser = require('../middleware/authUser');
const multer = require('../middleware/multer-config');

const userLevelCtrl = require('../controllers/userLevel');

router.get('/enable', userLevelCtrl.getAllEnable);
router.get('/', auth, userLevelCtrl.getAll);
router.post('/', auth, multer, userLevelCtrl.create);
router.get('/:id', auth, userLevelCtrl.getOne);
router.put('/:id', auth, userLevelCtrl.modify);
router.delete('/:id', auth, userLevelCtrl.delete);

module.exports = router;