const UserQuiz = require("../models/userQuiz");

exports.create = (req, res, next) => {
  const userQuiz = new UserQuiz({
    user: req.body.user,
    quiz: req.body.quiz,
  });

  userQuiz
    .save()
    .then(() => {
      res.status(201).json({
        message: " saved successfully!",
        value: userQuiz,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.getOne = (req, res, next) => {
  const filter = {};
  filter._id = req.params.id;

  if (req.query.enable !== undefined) {
    filter.enable = req.query.enable;
  }

  if (req.query.quiz !== undefined) {
    filter.quiz = req.query.quiz;
  }

  if (req.query.user !== undefined) {
    filter.user = req.query.user;
  }
  UserQuiz.findOne(filter)
    .populate("userQuizCategories")
    .then((userQuiz) => {
      res.status(200).json(userQuiz);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getFindOne = (req, res, next) => {
  const filter = {};

  if (req.query.enable !== undefined) {
    filter.enable = req.query.enable;
  }

  if (req.query.quiz !== undefined) {
    filter.quiz = req.query.quiz;
  }

  if (req.query.user !== undefined) {
    filter.user = req.query.user;
  }

  // console.log(filter)
  UserQuiz.findOne(filter)
    .populate("userQuizCategories")
    .then((userQuiz) => {
      res.status(200).json(userQuiz);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userQuiz = new UserQuiz({
    _id: req.params.id,
    enable: req.body.enable,
  });

  UserQuiz.updateOne({ _id: req.params.id }, userQuiz)
    .then(() => {
      res.status(201).json({
        message: "User Quiz updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  UserQuiz.findOne({ _id: req.params.id })
    .then((userQuiz) => {
      UserQuiz.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  const filter = req.query;
  console.log(filter);
  UserQuiz.find(filter)
    .populate("userQuizCategories")
    .then((userQuizs) => {
      res.status(200).json(userQuizs);
      console.log(userQuizs);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllByQuiz = (req, res, next) => {
  const filter = req.query;
  UserQuiz.find(filter)
    .populate({
      path: "userQuizCategories",
      populate: { path: "userQuizCategoryQuestions" },
    })
    .then((userQuizs) => {
      res.status(200).json(userQuizs);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getInfoByUser = (req, res, next) => {
  const filter = req.query;
  UserQuiz.find(filter)
    .populate({
      path: "userQuizCategories",
      populate: { path: "userQuizCategoryQuestions" },
    })
    .then((userQuizs) => {
      res.status(200).json({
        userQuizs: userQuizs,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
