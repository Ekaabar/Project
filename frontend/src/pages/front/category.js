import React, { Component } from "react";
import Header from "../../components/Header";
import ApiNoS from "../../services/ApiNoS";
import "./front.css";
import { getUser, getUserQuizSession } from "../../services/Common";
import { Link } from "react-router-dom";
import { withParams } from "../../services/HOC";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getUser(),
      userQuiz: getUserQuizSession(),
      userQuizCategory: [],
      userQuizCategoryQuestions: [],
      data_category: [],
      data_questions: [],
      cat_id: this.props.params.id,
      questionsAnswers: [],
    };

    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    ApiNoS.get("quiz/category/" + this.state.cat_id).then((res) => {
      const data_category = res.data;
      this.setState({
        data_category: data_category,
      });

      ApiNoS.get(
        "user/quiz/category/findone?enable=1&quizCategory=" +
          this.state.cat_id +
          "&userQuiz=" +
          this.state.userQuiz._id
      ).then((res) => {
        const data = res.data;
        this.setState({ userQuizCategory: res.data });
        console.log(data);
        if (!data) {
          ApiNoS.post("user/quiz/category/u/", {
            quizCategory: this.state.cat_id,
            userQuiz: this.state.userQuiz._id,
            name: data_category.name,
          })
            .then((res) => {
              console.log(res);
              this.setState({ userQuizCategory: res.data.data });
            })
            .catch((error) => {
              if (error) {
                console.log(error);
              }
            });
        }
      });
    });
    var data_questions_ = [];
    ApiNoS.get("quiz/category/question/category/" + this.state.cat_id).then(
      (res) => {
        const data_questions = res.data;
        console.log(data_questions);

        this.setState({ data_questions });
        data_questions_ = data_questions;
      }
    );

    ApiNoS.get(
      "user/quiz/category/findone?userQuiz=" +
        this.state.userQuiz._id +
        "&quizCategory=" +
        this.state.cat_id
    ).then((res) => {
      console.log(res.data.userQuizCategoryQuestions);
      var userQuizCategory = res.data;
      this.setState({
        userQuizCategoryQuestions: res.data.userQuizCategoryQuestions,
      });

      var questionsAnswersArray = [];
      var questionsAnswers = this.state.userQuizCategoryQuestions.map(function (
        questionsAnswer
      ) {
        console.log(questionsAnswer);
        questionsAnswersArray[questionsAnswer.quizCategoryQuestion._id] =
          questionsAnswer.enable;
        return {
          _id: questionsAnswer.quizCategoryQuestion._id,
          enable: questionsAnswer.enable,
        };
      });
      console.log(questionsAnswers);
      if (data_questions_.length == questionsAnswers.length) {
        var stateCategorie = false;
        questionsAnswers.forEach((element) => {
          if (element.enable === true) {
            stateCategorie = true;
            return;
          }
        });
        console.log(stateCategorie);
        if (stateCategorie === false && questionsAnswers.length > 0) {
          let formData = new FormData();
          formData.append("enable", false);

          ApiNoS.put("user/quiz/category/u/" + userQuizCategory._id, formData)
            .then((res) => {
              console.log(res);
              this.props.navigate("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      console.log(
        questionsAnswers.find(
          (qs) => qs._id === "625d57b462eea238dc935d70" && qs.enable === false
        )
      );
      console.log(
        questionsAnswers.find(
          (qs) => qs._id === "625d57b462eea238dc935d70" && qs.enable === false
        )
      );

      this.setState({ questionsAnswers: questionsAnswers });
    });
  }

  handleNav(question) {
    console.log(this.state.userQuizCategory._id);
    console.log(question);

    if (this.state.userQuizCategory && this.state.userQuizCategory.enable) {
      ApiNoS.get(
        "user/quiz/category/question/findone?userQuizCategory=" +
          this.state.userQuizCategory._id +
          "&quizCategoryQuestion=" +
          question._id
      ).then((res) => {
        const data = res.data;
        console.log(data);

        if (!data) {
          console.log(data);
          ApiNoS.post("user/quiz/category/question/u/", {
            title: question.title,
            description: question.description,
            score: question.score,
            note: question.note,
            userQuizCategory: this.state.userQuizCategory._id,
            quizCategoryQuestion: question._id,
          })
            .then((res) => {
              console.log(res);
              this.props.navigate(
                "/quiz/" + question._id + "/" + res.value._id
              );
            })
            .catch((error) => {
              if (error) {
                console.log(error);
              }
            });
        } else {
          this.props.navigate("/quiz/" + question._id + "/" + data._id);
        }
      });
    }
  }

  render() {
    const { data_category, data_questions } = this.state;

    return (
      <div className="container-fluid bg-light">
        <Header />
        <main role="main" className="flex-shrink-0">
          <div className="container container-body">
            <div className="row">
              <h1 className="text-center mt-3"> {data_category.name} </h1>
              <p className="text-center mb-5"> {data_category.description} </p>
              <div className="album py-5">
                <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data_questions.map((question, index) => (
                      <div className="col">
                        <div className="card shadow-sm">
                          <img
                            src={
                              question.imageUrl
                                ? question.imageUrl
                                : "https://picsum.photos/800/600.webp?random=" +
                                  (index + 1) +
                                  "&blur=6"
                            }
                            className="card-img-top"
                            alt={question.title}
                          />
                          <div className="card-body">
                            <h3 className="card-text text-center">
                              {question.title}
                            </h3>
                            <p className="card-text text-center">
                              {question.description}
                            </p>

                            <div className="d-flex justify-content-center align-items-center">
                              <div className="btn-group">
                                {
                                  this.state.questionsAnswers.filter(
                                    (qs) => qs._id === question._id
                                  ).enable
                                }{" "}
                                +++
                                {question._id}
                                {question.enable === true && (
                                  <>
                                    {this.state.questionsAnswers.find(
                                      (qs) =>
                                        qs._id === question._id &&
                                        qs.enable === false
                                    ) === undefined && (
                                      <span
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => this.handleNav(question)}
                                      >
                                        View
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withParams(Category);
