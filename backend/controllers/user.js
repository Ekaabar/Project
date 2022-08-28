const User = require("../models/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
/***********************************SIN UP*******************************/
/************************************************************************/
//name address tel email password
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        age: new Date(req.body.age),
        userLevel: req.body.userLevel,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
            user: user,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/***************************************LOG IN******************************/
/***************************************************************************/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    // .populate('userLevel')
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            userId: user._id,
            user: user,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/*******************************CREATE = PUT*********************************/
/***************************************************************************/
exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        age: req.body.age,
        userLevel: req.body.userLevel,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({ message: "User creacted with success !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
/**********************************GET ONE***********************************/
/***************************************************************************/
exports.getOneUser = (req, res, next) => {
  User.findOne({
    _id: req.params.id,
  })
    .populate("userLevel")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getOneUserInfo = (req, res, next) => {
  User.find({
    _id: req.params.id,
  })
    .populate("userQuizs")
    .populate({
      path: "userQuizs",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: {
        path: "userQuizCategories",
      },
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
/***************************************MODIFY = SET******************************/
/***************************************************************************/
exports.modifyUser = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    name: req.body.name,
    age: req.body.age,
    userLevel: req.body.userLevel,
    email: req.body.email,
  });

  User.updateOne({ _id: req.params.id }, user)
    .then(() => {
      res.status(201).json({
        message: "User updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.modifyUserProfil = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    userLevel: req.body.userLevel,
  });

  const filter = { _id: req.params.id };
  const update = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    userLevel: req.body.userLevel,
  };

  User.findOneAndUpdate(filter, update, { new: true, rawResult: true })
    .populate("userLevel")
    .then((user) => {
      res.status(201).json({
        message: "User updated successfully!",
        user: user.value,
      });
      console.log(user);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.modifyUserProfilOld = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    userLevel: req.body.userLevel,
  });

  User.updateOne({ _id: req.params.id }, user)
    .then(() => {
      res.status(201).json({
        message: "User updated successfully!",
        user: user,
      });

      user.populate("userLevel");
      console.log(user);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
/***************************************DELETE******************************/
/***************************************************************************/
exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      const filename = user.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        User.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "User deleted successfully !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
/***************************************GET ALL ******************************/
/***************************************************************************/
exports.getAllUser = (req, res, next) => {
  User.find()
    .populate("userQuizs")
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
