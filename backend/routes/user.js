const express = require("express");
const router = express.Router();

const authUser = require("../middleware/authUser");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const userCtrl = require("../controllers/user");
// registration and login
router.post("/b/signup", userCtrl.signup);
router.post("/b/login", userCtrl.login);
// user profil
router.put("/p/:id", authUser, userCtrl.modifyUserProfil);

// admininstration

router.get("/info/:id", auth, userCtrl.getOneUserInfo);
router.get("/", auth, userCtrl.getAllUser);
router.post("/", auth, multer, userCtrl.createUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.modifyUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
