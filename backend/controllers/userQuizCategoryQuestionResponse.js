const UserQuizCategoryQuestionResponse = require("../models/userQuizCategoryQuestionResponse");

exports.create = (req, res, next) => {
  const userQuizCategoryQuestionResponse = new UserQuizCategoryQuestionResponse(
    {
      title: req.body.title,
      quizCategoryQuestionOption: req.body.quizCategoryQuestionOption,
      userQuizCategoryQuestionChild: req.body.userQuizCategoryQuestionChild,
      selectedResponse: req.body.selectedResponse,
    }
  );

  userQuizCategoryQuestionResponse
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
  UserQuizCategoryQuestionResponse.findOne({
    _id: req.params.id,
  })
    .then((userQuizCategoryQuestionResponse) => {
      res.status(200).json(userQuizCategoryQuestionResponse);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userQuizCategoryQuestionResponse = new UserQuizCategoryQuestionResponse(
    {
      _id: req.params.id,
      enable: req.body.enable,
    }
  );

  UserQuizCategoryQuestionResponse.updateOne(
    { _id: req.params.id },
    userQuizCategoryQuestionResponse
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
  UserQuizCategoryQuestionResponse.findOne({ _id: req.params.id })
    .then((userQuizCategoryQuestionResponse) => {
      UserQuizCategoryQuestionResponse.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  UserQuizCategoryQuestionResponse.find()
    .then((userQuizCategoryQuestionResponses) => {
      res.status(200).json(userQuizCategoryQuestionResponses);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
