import React, { Component } from "react";
import Header from "../../components/Header";
import ApiNoS from "../../services/ApiNoS";
import "./front.css";
import {
  getQuizId,
  getUser,
  getUserQuizSession,
  setUserLevels,
  setUserQuizSession,
} from "../../services/Common";
import { withParams } from "../../services/HOC";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      user: getUser(),
      userQuiz: getUserQuizSession(),
      url_get_user_level: "user/level/",
      url_get_quiz_cat: "quiz/",
      quiz_id: getQuizId(),
      data_category: [],
      data_quiz: [],
      userQuizCategoriesState: [],
      dataUserQuizCategoriesState: [],
    };

    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    ApiNoS.get(this.state.url_get_user_level + "enable/").then((res) => {
      const data = res.data;
      setUserLevels(data);
    });

    ApiNoS.get("quiz/" + this.state.quiz_id).then((res) => {
      const data = res.data;
      console.log(data);
      this.setState({
        data_quiz: data,
      });
    });

    ApiNoS.get("quiz/category/quiz/" + this.state.quiz_id).then((res) => {
      const data_category = res.data;
      console.log(data_category);
      this.setState({ data_category });
    });
    var data_categories = [];
    ApiNoS.get("quiz/category/quiz/" + this.state.quiz_id).then((res) => {
      const data_category = res.data;
      console.log(data_category);
      this.setState({ data_category });
      data_categories = data_category;
    });
    console.log(this.state.userQuiz);
    var userQuizCategoriesState = [];
    ApiNoS.get(
      "user/quiz/findone?enable=1&user=" +
        this.state.user._id +
        "&quiz=" +
        this.state.quiz_id
    ).then((res) => {
      const data = res.data;
      console.log(data);
      if (data) {
        setUserQuizSession(data);
        this.setState({ userQuiz: data });
        var dataUserQuizCategoriesState = data.userQuizCategories.map(function (
          userQuizCategorie
        ) {
          userQuizCategoriesState[userQuizCategorie.quizCategory._id] =
            userQuizCategorie.enable;
          return {
            id_: userQuizCategorie.quizCategory._id,
            enable: userQuizCategorie.enable,
          };
        });
        console.log(dataUserQuizCategoriesState);
        console.log(userQuizCategoriesState);
        this.setState({
          userQuizCategoriesState: userQuizCategoriesState,
          dataUserQuizCategoriesState: dataUserQuizCategoriesState,
        });

        console.log(dataUserQuizCategoriesState);
        var ss = dataUserQuizCategoriesState.find(
          (element) => element._id == "6237b7e73164c21010484d10"
        );
        console.log(userQuizCategoriesState["6237b7e73164c21010484d10"]);

        if (data_categories.length === dataUserQuizCategoriesState.length) {
          var stateQuiz = false;
          userQuizCategoriesState.forEach((element) => {
            if (element.enable === true) {
              stateQuiz = true;
              return;
            }
          });

          if (stateQuiz === false && dataUserQuizCategoriesState.length > 0) {
            let formData = new FormData();
            formData.append("enable", false);

            ApiNoS.put("user/quiz/u/" + data._id, formData)
              .then((res) => {
                console.log(res);
                this.props.navigate("/");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      } else {
        ApiNoS.post(`user/quiz/u/`, {
          user: this.state.user._id,
          quiz: this.state.quiz_id,
        })
          .then((res) => {
            console.log(res.data);
            setUserQuizSession(res.data.value);
            this.setState({ userQuiz: res.data.value });
          })
          .catch((error) => {
            if (error) {
              console.log(error);
            }
          });
      }
    });
  }

  handleNav(id) {
    this.props.navigate("/category/" + id);
  }

  render() {
    const { data_category, data_quiz, userQuizCategoriesState } = this.state;

    return (
      <div className="container-fluid bg-light">
        <Header />
        <main role="main" className="flex-shrink-0">
          <div className="container container-body">
            <div className="row">
              <h1 className="text-center mt-3"> {data_quiz.name} </h1>
              <p className="text-center mb-5"> {data_quiz.description} </p>
              <div className="album py-5">
                <div className="container">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 align-items-stretch g-4 py-5">
                    {data_category.map((category, index) => (
                      <div className="col">
                        <div
                          className={
                            (userQuizCategoriesState[category._id] &&
                              userQuizCategoriesState[category._id] === true) ||
                            userQuizCategoriesState[category._id] === undefined
                              ? "card shadow-sm"
                              : "card shadow-sm opacity-50"
                          }
                        >
                          <img
                            src={require("./" + (index + 1) + ".png")}
                            className="card-img-top"
                            alt={category.name}
                          />
                          {/* <img src={category.imageUrl ? index + 1 + ".png" : "https://picsum.photos/800/600.webp?random=" + (index + 1) + "&blur=6"} className="card-img-top" alt={category.name} /> */}
                          <div className="card-body">
                            <h3 className="card-text text-center">
                              {category.name}
                              <br />
                              {userQuizCategoriesState[category._id] === true
                                ? "true"
                                : "false"}
                              <br />
                              {category._id}
                            </h3>
                            <p className="card-text text-center">
                              {category.description}
                            </p>
                            <div className="d-flex justify-content-center align-items-center">
                              <div className="btn-group">
                                {((userQuizCategoriesState[category._id] &&
                                  userQuizCategoriesState[category._id] ===
                                    true) ||
                                  userQuizCategoriesState[category._id] ===
                                    undefined) && (
                                  <>
                                    <span
                                      type="button"
                                      className="btn btn-sm btn-outline-secondary"
                                      onClick={() =>
                                        this.handleNav(category._id)
                                      }
                                    >
                                      View
                                    </span>
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

export default withParams(Home);
