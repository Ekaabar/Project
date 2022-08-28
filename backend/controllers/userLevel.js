const UserLevel = require("../models/userLevel");

exports.create = (req, res, next) => {
  const userLevel = new UserLevel({
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  userLevel
    .save()
    .then(() => {
      res.status(201).json({
        message: "userlevel saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  UserLevel.findOne({
    _id: req.params.id,
  })
    .then((userLevel) => {
      res.status(200).json(userLevel);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userLevel = new UserLevel({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  UserLevel.updateOne({ _id: req.params.id }, userLevel)
    .then(() => {
      res.status(201).json({
        message: "User Level updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  UserLevel.findOne({ _id: req.params.id })
    .then((userLevel) => {
      UserLevel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  UserLevel.find()
    .then((userLevels) => {
      res.status(200).json(userLevels);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllEnable = (req, res, next) => {
  UserLevel.find({ enable: 1 })
    .then((userLevels) => {
      res.status(200).json(userLevels);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
