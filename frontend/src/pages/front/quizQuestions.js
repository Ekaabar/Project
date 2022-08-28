import React, { Component } from "react";
import Header from "../../components/Header";
import ApiNoS from "../../services/ApiNoS";
import "./front.css";
import { getUser } from "../../services/Common";
import { Link } from "react-router-dom";
import { withParams } from "../../services/HOC";
import Quiz from "react-quiz-component";
import { quizexemple } from "./quiz-exmple";

class QuizQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: getUser(),
      data_category: [],
      quest_id: this.props.params.id,
      user_quest_id: this.props.params.user_quest_id,
      quiz_data: null,
      url_action_quest_child: "quiz/category/question/child/",
      url_action_quest_option: "quiz/category/question/option/",
      url_action_quest: "quiz/category/question/",
      url_action_user_quest: "user/quiz/category/question/",
      data_question_childs: [],
      data_question_options: [],
      data_question: [],
      data_questions: [],
    };
    this.setQuizResult = this.setQuizResult.bind(this);
    this.renderCustomResultPage = this.renderCustomResultPage.bind(this);
  }

  componentDidMount() {
    // ApiNoS

    ApiNoS.get(this.state.url_action_quest + this.state.quest_id).then(
      (res) => {
        console.log(res);
        const data = res.data;
        // console.log(data)
        // if (data.enable === false) {
        //     this.props.navigate("/category/" + data.quizCategory._id);
        // }
        this.setState({
          data_question: data,
        });
      }
    );
    ApiNoS.get(
      this.state.url_action_quest_child + "question/" + this.state.quest_id
    ).then((res) => {
      const data_question_childs = res.data;
      // console.log(data_question_childs)
      this.setState({ data_question_childs });
    });
    ApiNoS.get(
      this.state.url_action_quest_option + "question/" + this.state.quest_id
    ).then((res) => {
      const data_question_options = res.data;
      // console.log(data_question_options)
      this.setState({ data_question_options });
    });
    ApiNoS.get(this.state.url_action_user_quest).then((res) => {
      const data = res.data;
      console.log(data);
    });

    ApiNoS.get(
      this.state.url_action_user_quest + "/" + this.state.user_quest_id
    ).then((res) => {
      const data = res.data;
      console.log(data);
      if (data.enable === false) {
        // this.props.navigate("/category/" + data.userQuizCategory.quizCategory._id);
      }
    });

    console.log(this.state.user_quest_id);
    console.log(this.state.quest_id);
    this.setState({ data_questions: quizexemple.questions });

    ApiNoS.get(
      "user/quiz/category/question/child/?userQuizCategoryQuestion=" +
        this.state.user_quest_id
    )
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setQuizResult = (obj) => {
    console.log(obj);

    // var questions = obj.questions.map((question, index) => {

    //     ApiNoS.post('user/quiz/category/question/child/u/', {
    //         title: question.question,
    //         description: question.description,
    //         enable: question.enable,
    //         imageUrl: question.questionPic,
    //         questionType: question.questionType,
    //         answerSelectionType: question.answerSelectionType,
    //         point: question.point,
    //         userQuizCategoryQuestion: this.state.user_quest_id,
    //         quizCategoryQuestionChild: question.questionId,
    //     }).then(res => {
    //         console.log(res);
    //         return res.value._id;
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // });

    let formData = new FormData();
    formData.append("quizCategoryQuestion", this.state.quest_id);
    formData.append("correctPoints", obj.correctPoints);
    formData.append("numberOfCorrectAnswers", obj.numberOfCorrectAnswers);
    formData.append("numberOfIncorrectAnswers", obj.numberOfIncorrectAnswers);
    formData.append("numberOfQuestions", obj.numberOfQuestions);
    formData.append("userInput", JSON.stringify(obj.userInput));
    // formData.append('userQuizCategoryQuestionChilds', this.state.userQuizCategoryQuestionChilds);
    formData.append("enable", false);
    formData.append("questions", JSON.stringify(obj.questions));
    console.log(obj);
    ApiNoS.put(
      this.state.url_action_user_quest + "u/" + this.state.user_quest_id,
      formData
    )
      .then((res) => {
        console.log(res);
        this.props.navigate(
          "/category/" + this.state.data_question.quizCategory._id
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderCustomResultPage = (obj) => {
    console.log(obj);
    return (
      <div>
        This is a custom result page. You can use obj to render your custom
        result page
      </div>
    );
  };
  render() {
    var { data_question_options, data_question_childs, data_question } =
      this.state;

    var answers = data_question_options.map((answer) => answer.title);
    var answers_id = data_question_options.map((answer) => answer._id);
    var questions = [];
    console.log(data_question_options);
    console.log(data_question_childs);

    if (
      data_question_options.length !== 0 &&
      data_question_childs.length !== 0
    ) {
      questions = data_question_childs.map(function (question) {
        // question => ({

        var obj = {};

        obj.questionId = question._id;
        obj.questionParent = question._id;
        obj.question = question.title;
        obj.questionType = question.questionType;
        obj.questionPic = question.imageUrl
          ? question.imageUrl
          : "https://dummyimage.com/600x400/000/fff&text=" + question.name;
        obj.answerSelectionType = question.answerSelectionType;
        obj.answers = answers;

        var correctAnswers = question.quizCategoryQuestionOptionCorrects.map(
          function (optionCorrect) {
            return answers_id.indexOf(optionCorrect._id) + 1;
          }
        );

        obj.correctAnswer =
          question.answerSelectionType == "single"
            ? correctAnswers[0] + ""
            : correctAnswers;
        obj.messageForCorrectAnswer = "Correct answer. Good job.";
        obj.messageForIncorrectAnswer = "Incorrect answer. Please try again.";
        obj.explanation =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
        obj.point = question.point;
        return obj;
      });
    }
    var quiz_data = {
      quizTitle: data_question.title,
      quizSynopsis: data_question.description,
      nrOfQuestions: data_question_childs.length,
      questions: questions,
    };

    if (questions.length === 0 || answers.length === 0) {
      return (
        <div className="container-fluid bg-light">
          <Header />
          <main role="main" className="flex-shrink-0">
            <div className="container container-body">
              <div className="row">
                {/* <h1 className='text-center mt-3'> {data_question.name} </h1>
                            <p className='text-center mb-5'> {data_question.description} </p> */}
                <div className="album py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">Not question find !!!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }

    return (
      <div className="container-fluid bg-light">
        <Header />
        <main role="main" className="flex-shrink-0">
          <div className="container container-body">
            <div className="row">
              {/* <h1 className='text-center mt-3'> {data_question.name} </h1>
                            <p className='text-center mb-5'> {data_question.description} </p> */}
              <div className="album py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      {quiz_data && quiz_data.questions && (
                        <>
                          <Quiz
                            quiz={quiz_data}
                            showDefaultResult={false}
                            onComplete={this.setQuizResult}
                            customResultPage={this.renderCustomResultPage}
                          />
                        </>
                      )}
                    </div>
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

export default withParams(QuizQuestions);
