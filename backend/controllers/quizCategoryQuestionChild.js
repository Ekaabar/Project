const QuizCategoryQuestionChild = require("../models/quizCategoryQuestionChild");

exports.create = (req, res, next) => {
  let imageUrl = "";
  const object = {};

  if (req.file) {
    object.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  object.title = req.body.title;
  object.description = req.body.description;
  object.enable = req.body.enable;
  object.questionType = req.body.questionType;
  object.answerSelectionType = req.body.answerSelectionType;
  object.point = req.body.point;
  object.quizCategoryQuestionOptionCorrects =
    req.body.quizCategoryQuestionOptionCorrects;
  object.quizCategoryQuestionParent = req.body.quizCategoryQuestionParent;

  const quizCategoryQuestionChild = new QuizCategoryQuestionChild(object);

  quizCategoryQuestionChild
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
  QuizCategoryQuestionChild.findOne({ _id: req.params.id })
    .populate("quizCategoryQuestionParent")
    .then((quizCategoryQuestionChild) => {
      res.status(200).json(quizCategoryQuestionChild);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  let imageUrl = "";
  const object = {};

  if (req.file) {
    object.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  object.title = req.body.title;
  object.description = req.body.description;
  object.enable = req.body.enable;
  object.questionType = req.body.questionType;
  object.answerSelectionType = req.body.answerSelectionType;
  object.point = req.body.point;
  object.quizCategoryQuestionOptionCorrects =
    req.body.quizCategoryQuestionOptionCorrects;
  object.quizCategoryQuestionParent = req.body.quizCategoryQuestionParent;
  object._id = req.params.id;

  console.log(object);
  console.log(req.body);
  const quizCategoryQuestionChild = new QuizCategoryQuestionChild(object);

  QuizCategoryQuestionChild.updateOne(
    { _id: req.params.id },
    quizCategoryQuestionChild
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
  QuizCategoryQuestionChild.findOne({ _id: req.params.id })
    .populate("quizCategoryQuestionParent")
    .then((quizCategoryQuestionChild) => {
      QuizCategoryQuestionChild.deleteOne({ _id: req.params.id })
        .then(() =>
          res
            .status(200)
            .json({ message: "deleted QuizCategoryQuestionChild !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  QuizCategoryQuestionChild.find()
    .populate("quizCategoryQuestionParent")
    .then((quizCategoryQuestionChilds) => {
      res.status(200).json(quizCategoryQuestionChilds);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllByQuestion = (req, res, next) => {
  QuizCategoryQuestionChild.find({
    quizCategoryQuestionParent: req.params.quest_id,
  })
    .populate("quizCategoryQuestionParent")
    .populate("quizCategoryQuestionOptionCorrects")
    .then((quizCategoryQuestionChilds) => {
      res.status(200).json(quizCategoryQuestionChilds);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
