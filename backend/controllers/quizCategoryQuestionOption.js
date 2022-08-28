const QuizCategoryQuestionOption = require("../models/quizCategoryQuestionOption");

exports.create = (req, res, next) => {
  const quizCategoryQuestionOption = new QuizCategoryQuestionOption({
    title: req.body.title,
    description: req.body.description,
    enable: req.body.enable,
    quizCategoryQuestion: req.body.quizCategoryQuestion,
    quizCategoryQuestionType: req.body.quizCategoryQuestionType,
  });

  quizCategoryQuestionOption
    .save()
    .then(() => {
      res.status(201).json({
        message: "Option saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  QuizCategoryQuestionOption.findOne({ _id: req.params.id })
    .populate("quizCategoryQuestion")
    .populate("quizCategoryQuestionType")
    .then((quizCategoryQuestionOption) => {
      res.status(200).json(quizCategoryQuestionOption);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const quizCategoryQuestionOption = new QuizCategoryQuestionOption({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    enable: req.body.enable,
    quizCategoryQuestion: req.body.quizCategoryQuestion,
    quizCategoryQuestionType: req.body.quizCategoryQuestionType,
  });

  QuizCategoryQuestionOption.updateOne(
    { _id: req.params.id },
    quizCategoryQuestionOption
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
  QuizCategoryQuestionOption.findOne({ _id: req.params.id })
    .populate("quizCategoryQuestion")
    .populate("quizCategoryQuestionType")
    .then((quizCategoryQuestionOption) => {
      QuizCategoryQuestionOption.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  QuizCategoryQuestionOption.find()
    .populate("quizCategoryQuestion")
    .populate("quizCategoryQuestionType")
    .then((quizCategoryQuestionOptions) => {
      res.status(200).json(quizCategoryQuestionOptions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllByQuestion = (req, res, next) => {
  QuizCategoryQuestionOption.find({ quizCategoryQuestion: req.params.quest_id })
    .populate("quizCategoryQuestion")
    .then((quizCategoryQuestionChilds) => {
      res.status(200).json(quizCategoryQuestionChilds);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
