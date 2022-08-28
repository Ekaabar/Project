const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const userLevelRoutes = require("./routes/userLevel");
const userQuizRoutes = require("./routes/userQuiz");
const userQuizCategoryRoutes = require("./routes/userQuizCategory");
const userQuizCategoryQuestionRoutes = require("./routes/userQuizCategoryQuestion");
const userQuizCategoryQuestionChildRoutes = require("./routes/userQuizCategoryQuestionChild");
const userQuizCategoryQuestionResponseRoutes = require("./routes/userQuizCategoryQuestionResponse");
const quizRoutes = require("./routes/quiz");
const quizCategoryRoutes = require("./routes/quizCategory");
const quizCategoryQuestionRoutes = require("./routes/quizCategoryQuestion");
const quizCategoryQuestionChildRoutes = require("./routes/quizCategoryQuestionChild");
const quizCategoryQuestionOptionRoutes = require("./routes/quizCategoryQuestionOption");
const quizCategoryQuestionOptionTypeRoutes = require("./routes/quizCategoryQuestionOptionType");

const app = express();
//Connect our API to our MongoDB cluster
mongoose
  .connect(
    "mongodb+srv://Admin:TestDB22@cluster0.vvxkn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(bodyParser.json());
//To enable cross-origin requests (and prevent CORS errors), specific access control
//headers must be specified for all our response objects.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const path = require("path");
app.use("/images", express.static(path.join(__dirname, "images")));

//add the routing manager:

app.use("/api/admin", adminRoutes);
app.use(
  "/api/user/quiz/category/question/child",
  userQuizCategoryQuestionChildRoutes
);
app.use("/api/user/quiz/category/question", userQuizCategoryQuestionRoutes);
app.use("/api/user/quiz/category", userQuizCategoryRoutes);
app.use("/api/user/quiz", userQuizRoutes);
app.use("/api/user/level", userLevelRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quiz/category/question/child", quizCategoryQuestionChildRoutes);
app.use("/api/quiz/category/question/option", quizCategoryQuestionOptionRoutes);
app.use(
  "/api/quiz/category/question/type",
  quizCategoryQuestionOptionTypeRoutes
);
app.use("/api/quiz/category/question", quizCategoryQuestionRoutes);
app.use("/api/quiz/category", quizCategoryRoutes);
app.use("/api/quiz", quizRoutes);

module.exports = app;
