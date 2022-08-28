const QuizCategoryQuestion = require("../models/quizCategoryQuestion");

exports.create = (req, res, next) => {
  const object = {};

  if (req.file) {
    object.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  object.title = req.body.title;
  object.description = req.body.description;
  object.enable = req.body.enable;
  object.quizCategory = req.body.quizCategory;

  const quizCategoryQuestion = new QuizCategoryQuestion(object);

  quizCategoryQuestion
    .save()
    .then(() => {
      res.status(201).json({
        message: "Question saved successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  QuizCategoryQuestion.findOne({ _id: req.params.id })
    .populate("quizCategory")
    .then((quizCategoryQuestion) => {
      res.status(200).json(quizCategoryQuestion);
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
  object.quizCategory = req.body.quizCategory;
  object._id = req.params.id;
  /*
        const quizCategoryQuestion = new QuizCategoryQuestion({
            title: req.body.title,
            description: req.body.description,
            enable: req.body.enable,
            score: req.body.score,
            // imageUrl: req.body.imageUrl,
            imageUrl: imageUrl,
            quizCategory: req.body.quizCategory
        });
    */
  const quizCategoryQuestion = new QuizCategoryQuestion(object);

  console.log(req.body);
  console.log(quizCategoryQuestion);
  QuizCategoryQuestion.updateOne({ _id: req.params.id }, quizCategoryQuestion)
    .then(() => {
      res.status(201).json({
        message: "User QuizCategoryQuestion updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  QuizCategoryQuestion.findOne({ _id: req.params.id })
    .then((quizCategoryQuestion) => {
      QuizCategoryQuestion.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Question deleted !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  QuizCategoryQuestion.find()
    .populate("quizCategory")
    .then((quizCategoryQuestions) => {
      res.status(200).json(quizCategoryQuestions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllByCategory = (req, res, next) => {
  QuizCategoryQuestion.find({ quizCategory: req.params.id })
    .populate("quizCategory")
    .then((quizCategoryQuestions) => {
      res.status(200).json(quizCategoryQuestions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
