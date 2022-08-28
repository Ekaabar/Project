const QuizCategory = require("../models/quizCategory");

exports.create = (req, res, next) => {
  const quizCategory = new QuizCategory({
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
    quiz: req.body.quiz,
  });

  quizCategory
    .save()
    .then(() => {
      res.status(201).json({
        message: " saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  QuizCategory.findOne({ _id: req.params.id })
    .populate("quiz")
    .then((quizCategory) => {
      res.status(200).json(quizCategory);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const quizCategory = new QuizCategory({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
    quiz: req.body.quiz,
  });

  QuizCategory.updateOne({ _id: req.params.id }, quizCategory)
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
  QuizCategory.findOne({ _id: req.params.id })
    .populate("quiz")
    .then((quizCategory) => {
      QuizCategory.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted QuizCategory !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  QuizCategory.find()
    .populate("quiz")
    .then((quizCategorys) => {
      res.status(200).json(quizCategorys);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.getAllByQuiz = (req, res, next) => {
  QuizCategory.find({ quiz: req.params.quiz_id })
    .populate("quiz")
    .then((quizCategorys) => {
      res.status(200).json(quizCategorys);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
