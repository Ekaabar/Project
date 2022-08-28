const UserQuizCategory = require("../models/userQuizCategory");

exports.create = (req, res, next) => {
  console.log(req.body);
  const userQuizCategory = new UserQuizCategory({
    userQuiz: req.body.userQuiz,
    quizCategory: req.body.quizCategory,
    name: req.body.name,
  });

  userQuizCategory
    .save()
    .then(() => {
      res.status(201).json({
        message: "saved successfully!",
        data: userQuizCategory,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  UserQuizCategory.findOne({
    _id: req.params.id,
  })
    .then((userQuizCategory) => {
      res.status(200).json(userQuizCategory);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getFindOne = (req, res, next) => {
  const filter = req.query;

  console.log(filter);
  UserQuizCategory.findOne(filter)
    .populate("userQuizCategoryQuestions")
    .then((userQuizCategory) => {
      res.status(200).json(userQuizCategory);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userQuizCategory = new UserQuizCategory({
    _id: req.params.id,
    enable: req.body.enable,
  });

  UserQuizCategory.updateOne({ _id: req.params.id }, userQuizCategory)
    .then(() => {
      res.status(201).json({
        message: "User QuizCategory updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  UserQuizCategory.findOne({ _id: req.params.id })
    .then((userQuizCategory) => {
      UserQuizCategory.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  UserQuizCategory.find()
    .populate("userQuizCategoryQuestions")
    .then((userQuizCategorys) => {
      res.status(200).json(userQuizCategorys);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getInfosAll = (req, res, next) => {
  console.log(req.query.user);
  UserQuizCategory.find()
    .populate("userQuizCategoryQuestions")
    .populate({
      path: "userQuiz",
      match: { user: { _id: req.query.user } },
    })
    .then((userQuizCategorys) => {
      res.status(200).json(userQuizCategorys);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
