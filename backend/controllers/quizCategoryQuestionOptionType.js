const QuizCategoryQuestionOptionType = require("../models/quizCategoryQuestionOptionType");

exports.create = (req, res, next) => {
  const quizCategoryQuestionOptionType = new QuizCategoryQuestionOptionType({
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  quizCategoryQuestionOptionType
    .save()
    .then(() => {
      res.status(201).json({
        message: "saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  QuizCategoryQuestionOptionType.findOne({ _id: req.params.id })
    .then((quizCategoryQuestionOptionType) => {
      res.status(200).json(quizCategoryQuestionOptionType);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const quizCategoryQuestionOptionType = new QuizCategoryQuestionOptionType({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  QuizCategoryQuestionOptionType.updateOne(
    { _id: req.params.id },
    quizCategoryQuestionOptionType
  )
    .then(() => {
      res.status(201).json({
        message: "User QuizCategoryQuestionResponse updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  QuizCategoryQuestionOptionType.findOne({ _id: req.params.id })
    .then((quizCategoryQuestionOptionType) => {
      QuizCategoryQuestionOptionType.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  QuizCategoryQuestionOptionType.find()
    .then((quizCategoryQuestionOptionTypes) => {
      res.status(200).json(quizCategoryQuestionOptionTypes);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
