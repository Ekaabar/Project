const UserQuizCategoryQuestionChild = require("../models/userQuizCategoryQuestionChild");

exports.create = (req, res, next) => {
  const userQuizCategoryQuestionChild = new UserQuizCategoryQuestionChild({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    quizCategoryQuestionOptionCorrects:
      req.body.quizCategoryQuestionOptionCorrects,
    userQuizCategoryQuestion: req.body.userQuizCategoryQuestion,
    quizCategoryQuestionChild: req.body.quizCategoryQuestionChild,
    description: req.body.description,
    enable: req.body.enable,
    questionType: req.body.questionType,
    answerSelectionType: req.body.answerSelectionType,
    point: req.body.point,
  });

  userQuizCategoryQuestionChild
    .save()
    .then(() => {
      res.status(201).json({
        message: "saved successfully!",
        value: userQuizCategoryQuestionChild,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  UserQuizCategoryQuestionChild.findOne({
    _id: req.params.id,
  })
    .then((userQuizCategoryQuestionChild) => {
      res.status(200).json(userQuizCategoryQuestionChild);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userQuizCategoryQuestionChild = new UserQuizCategoryQuestionChild({
    _id: req.params.id,
    enable: req.body.enable,
  });

  UserQuizCategoryQuestionChild.updateOne(
    { _id: req.params.id },
    userQuizCategoryQuestionChild
  )
    .then(() => {
      res.status(201).json({
        message: "User QuizCategoryQuestionChild updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  UserQuizCategoryQuestionChild.findOne({ _id: req.params.id })
    .then((userQuizCategoryQuestionChild) => {
      UserQuizCategoryQuestionChild.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  UserQuizCategoryQuestionChild.find(req.query)
    .then((userQuizCategoryQuestionChilds) => {
      res.status(200).json(userQuizCategoryQuestionChilds);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
