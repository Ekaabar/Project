const Quiz = require("../models/quiz");

exports.create = (req, res, next) => {
  const quiz = new Quiz({
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  quiz
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  Quiz.findOne({
    _id: req.params.id,
  })
    .then((quiz) => {
      res.status(200).json(quiz);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const quiz = new Quiz({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    enable: req.body.enable,
  });

  Quiz.updateOne({ _id: req.params.id }, quiz)
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
  Quiz.findOne({ _id: req.params.id })
    .then((quiz) => {
      Quiz.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: " deleted quiz!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  Quiz.find()
    .then((quizs) => {
      res.status(200).json(quizs);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
