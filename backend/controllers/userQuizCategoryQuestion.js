const UserQuizCategoryQuestion = require("../models/userQuizCategoryQuestion");
const UserQuizCategory = require("../models/userQuizCategory");

exports.create = (req, res, next) => {
  const userQuizCategoryQuestion = new UserQuizCategoryQuestion({
    title: req.body.title,
    description: req.body.description,
    userQuizCategory: req.body.userQuizCategory,
    quizCategoryQuestion: req.body.quizCategoryQuestion,
  });

  userQuizCategoryQuestion
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
        value: userQuizCategoryQuestion,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOne = (req, res, next) => {
  UserQuizCategoryQuestion.findOne({
    _id: req.params.id,
  })
    .then((userQuizCategoryQuestion) => {
      res.status(200).json(userQuizCategoryQuestion);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getFindOne = (req, res, next) => {
  const filter = {};

  if (req.query._id !== undefined) {
    filter._id = req.query._id;
  }

  if (req.query.enable !== undefined) {
    filter.enable = req.query.enable;
  }

  if (req.query.userQuizCategory !== undefined) {
    filter.userQuizCategory = req.query.userQuizCategory;
  }

  if (req.query.quizCategoryQuestion !== undefined) {
    filter.quizCategoryQuestion = req.query.quizCategoryQuestion;
  }

  if (req.query.quizCategoryQuestion !== undefined) {
    filter.quizCategoryQuestion = req.query.quizCategoryQuestion;
  }

  console.log(filter);
  UserQuizCategoryQuestion.findOne(filter)
    .then((userQuizCategoryQuestion) => {
      res.status(200).json(userQuizCategoryQuestion);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modify = (req, res, next) => {
  const userQuizCategoryQuestion = new UserQuizCategoryQuestion({
    _id: req.params.id,
    enable: req.body.enable ? req.body.enable : true,
    correctPoints: req.body.correctPoints,
    numberOfCorrectAnswers: req.body.numberOfCorrectAnswers,
    numberOfIncorrectAnswers: req.body.numberOfIncorrectAnswers,
    numberOfQuestions: req.body.numberOfQuestions,
    userInput: JSON.parse(req.body.userInput),
    userQuizCategoryQuestions: req.body.userQuizCategoryQuestions,
    questions: JSON.parse(req.body.questions),
  });

  UserQuizCategoryQuestion.updateOne(
    { _id: req.params.id },
    userQuizCategoryQuestion
  )
    .then(() => {
      res.status(201).json({
        message: "User QuizCategoryQuestion updated successfully!",
        value: userQuizCategoryQuestion,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.userModify = (req, res, next) => {
  const filter = { _id: req.params.id };
  const update = {
    enable: req.body.enable ? req.body.enable : true,
    correctPoints: req.body.correctPoints,
    numberOfCorrectAnswers: req.body.numberOfCorrectAnswers,
    numberOfIncorrectAnswers: req.body.numberOfIncorrectAnswers,
    numberOfQuestions: req.body.numberOfQuestions,
    userInput: JSON.parse(req.body.userInput),
    userQuizCategoryQuestions: req.body.userQuizCategoryQuestions,
    questions: JSON.parse(req.body.questions),
  };

  UserQuizCategoryQuestion.findOneAndUpdate(filter, update, {
    new: true,
    rawResult: true,
  })
    .then((data) => {
      res.status(201).json({
        message: "User updated successfully!",
        value: data.value,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.delete = (req, res, next) => {
  UserQuizCategoryQuestion.findOne({ _id: req.params.id })
    .then((userQuizCategoryQuestion) => {
      UserQuizCategoryQuestion.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "deleted with success !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  UserQuizCategoryQuestion.find()
    .then((userQuizCategoryQuestions) => {
      res.status(200).json(userQuizCategoryQuestions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getInfosAll = (req, res, next) => {
  console.log(req.query.user);
  UserQuizCategoryQuestion.find()
    .populate("userQuizCategory")
    .populate({
      path: "userQuizCategory",
      populate: {
        path: "userQuiz",
        match: { user: req.query.user },
      },
    })
    .then((userQuizCategoryQuestions) => {
      res.status(200).json(userQuizCategoryQuestions);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
