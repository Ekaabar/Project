import React, { Component } from "react";
import Header from "../../components/Header";
import "./front.css";
import { getUser, getUserLevels } from "../../services/Common";
import { Link } from "react-router-dom";
import { withParams } from "../../services/HOC";
import Moment from "react-moment";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import ApiNoS from "../../services/ApiNoS";
import moment from "moment";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getUser(),
      error: null,
      userLevels: getUserLevels(),
      age_groups: ["[0-15[", "[15-20[", "[20-30[", "[30- ["],
      /* dataChartByAge: {},
      dataChartByEducat: {},
      options: {
        layout: {
          responsive: true,
          padding: {
            top: 15,
            bottom: 15,
          },
          margin: {
            top: 15,
            bottom: 15,
          },
        },
        plugins: {
          legend: {
            position: "right",
          },
          title: {
            display: true,
            text: "Chart Title",
            color: "#000",
            padding: {
              top: 15,
              bottom: 15,
            },
          },
        },
      },*/
      userQuizs: [],
      infosObj: {},
      usersInfosData: [],
      userMyRanking: 0,
      userMyRankingByAge: 0,
      userMyRankingByEduat: 0,
    };

    ChartJS.register(ArcElement, Tooltip, Legend);
  }

  async componentDidMount() {
    const age_groups = this.state.age_groups;
    const user_levels = this.state.userLevels;
    const userCurrent = this.state.user._id;

    const questions = await ApiNoS.get("quiz/category/question/child");
    const questionsResponse = await questions.data;
    const questionsResponseNote = questionsResponse.map(
      (element) => element.point
    );

    const questionsAvgNote =
      Math.round(
        questionsResponseNote.reduce((a, b) => a + b, 0) /
          questionsResponseNote.length
      ) / 2;

    ApiNoS.get("user/quiz/u/info?user=" + this.state.user._id).then((res) => {
      const userQuizs = res.data.userQuizs;
      //console.log(userQuizs);
      let infosArray = userQuizs.map(function (userQuiz) {
        let resByCat = userQuiz.userQuizCategories.map(function (
          userQuizCategorie
        ) {
          let resByQuestion = userQuizCategorie.userQuizCategoryQuestions.map(
            function (userQuizCategoryQuestion) {
              // console.log(userQuizCategoryQuestion)
              return userQuizCategoryQuestion.correctPoints;
            }
          );
          // console.log(resByQuestion)
          return resByQuestion.length === 0
            ? 0
            : resByQuestion.reduce((a, b) => a + b, 0) / resByQuestion.length;
        });
        //console.log(resByCat)
        return resByCat.reduce((a, b) => a + b, 0) / resByCat.length;
      });
      let infosObj = {};
      infosObj.max = Math.max(...infosArray).toFixed(0);
      this.setState({ infosObj });
    });

    const users = await ApiNoS.get("user/info");
    const usersResponse = await users.data;

    const usersQuizs = usersResponse.map(async function (user) {
      var userQuizsResponse = await ApiNoS.get(
        "user/quiz/u/info?user=" + user._id
      );
      //console.log(await userQuizsResponse.data)
      var userQuizsData = await userQuizsResponse.data.userQuizs;

      let infosArray = userQuizsData.map(async function (userQuiz) {
        var objInfoUser = {};
        let resByCat = userQuiz.userQuizCategories.map(function (
          userQuizCategorie
        ) {
          let resByQuestion = userQuizCategorie.userQuizCategoryQuestions.map(
            function (userQuizCategoryQuestion) {
              return userQuizCategoryQuestion.correctPoints;
            }
          );

          return (
            resByQuestion.reduce((a, b) => a + b, 0) / resByQuestion.length
          );
        });
        var sum = resByCat.reduce((a, b) => a + b, 0);
        var note = parseInt(sum) / resByCat.length;

        objInfoUser.note = isNaN(note) ? Math.floor(Math.random() * 0) : note;
        objInfoUser.note = parseInt(objInfoUser.note);
        var age = moment().diff(
          moment(userQuiz.user.age, "DD-MM-YYYY"),
          "years"
        );
        objInfoUser.age = age;

        switch (true) {
          case age < 15:
            objInfoUser.age_group = 0;
            break;
          case 15 <= age && age < 20:
            objInfoUser.age_group = 1;
            break;
          case 20 <= age && age < 30:
            objInfoUser.age_group = 2;
            break;
          case 30 <= age:
            objInfoUser.age_group = 3;
            break;
          default:
            objInfoUser.age_group = 0;
            break;
        }

        objInfoUser.age_group_name = age_groups[objInfoUser.age_group];
        objInfoUser._id = userQuiz._id;
        objInfoUser.user = userQuiz.user._id;
        objInfoUser.userLevel = userQuiz.user.userLevel._id;
        objInfoUser.userLevelName = userQuiz.user.userLevel.name;
        objInfoUser.userCurrent = userCurrent === userQuiz.user._id;

        return objInfoUser;
      });

      var infosArraySort = await infosArray.sort(async function (a, b) {
        return a.note - b.note;
      });

      console.log(await Promise.all(infosArray));
      var infosArraySortF = await Promise.all(infosArraySort);

      var max =
        (await infosArraySortF.length) > 0
          ? infosArraySortF.reduce((prev, current) =>
              prev.note > current.note ? prev : current
            )
          : undefined;
      console.log(max);

      return infosArraySortF[0] ? max : undefined;
    });

    const usersQuizsCalc = await Promise.all(usersQuizs);

    const usersQuizsCalcfilter = await usersQuizsCalc.filter(Boolean);
    console.log(usersQuizsCalcfilter);
    const usersQuizsCalcfilterAdmi = await usersQuizsCalcfilter.filter(
      function (element) {
        return element.note > questionsAvgNote;
      }
    );

    const usersQuizsCalcSort = await usersQuizsCalcfilter.sort(function (a, b) {
      return parseInt(b.note) - parseInt(a.note);
    });
    console.log(usersQuizsCalcSort);

    const userMyRankingObjec = await usersQuizsCalcSort.filter(
      (element) => element.user === userCurrent
    )[0];

    const userMyRanking = await usersQuizsCalcSort.findIndex(function (
      element
    ) {
      return element.user === userCurrent;
    });

    const usersQuizsCalcfilterByAge = await usersQuizsCalcfilter.filter(
      function (element) {
        return element.age_group === userMyRankingObjec.age_group;
      }
    );

    const usersQuizsCalcfilterByEduct = await usersQuizsCalcfilter.filter(
      function (element) {
        return element.userLevel === userMyRankingObjec.userLevel;
      }
    );

    const userMyRankingByAge = await usersQuizsCalcfilterByAge.findIndex(
      function (element) {
        return element.user === userCurrent;
      }
    );

    const userMyRankingByEduat = await usersQuizsCalcfilterByEduct.findIndex(
      function (element) {
        return element.user === userCurrent;
      }
    );

    const userMyRankingFinal = (await userMyRanking) + 1;
    const userMyRankingByEduatFinal = (await userMyRankingByEduat) + 1;
    const userMyRankingByAgeFinal = (await userMyRankingByAge) + 1;

    this.setState({
      userMyRanking: userMyRankingFinal,
      userMyRankingByAge: userMyRankingByAgeFinal,
      userMyRankingByEduat: userMyRankingByEduatFinal,
    });
    /*
    const usersQuizsCalcSortGroupByAge = await this.groupBy(
      usersQuizsCalcfilterAdmi,
      "age_group"
    );
    const usersQuizsCalcSortGroupByEducat = await this.groupBy(
      usersQuizsCalcfilterAdmi,
      "userLevelName"
    );

    var usersQuizsCalcSortGroupByAgeResArray = [];
    var usersQuizsCalcSortGroupByEducatResArray = [];

    age_groups.map(function (element) {
      usersQuizsCalcSortGroupByAgeResArray[element] = 0;
      return element;
    });

    user_levels.map(function (element) {
      usersQuizsCalcSortGroupByEducatResArray[element.name] = 0;
      return element;
    });

    const usersQuizsCalcSortGroupByAgeRes =
      await usersQuizsCalcSortGroupByAge.map(function (el) {
        usersQuizsCalcSortGroupByAgeResArray[el[0].age_group_name] =
          el.length / usersQuizsCalcfilterAdmi.length;
        return { age_group_name: el[0].age_group_name, leng: el.length };
      });

    const usersQuizsCalcSortGroupByEducatRes =
      await usersQuizsCalcSortGroupByEducat.map(function (el) {
        usersQuizsCalcSortGroupByEducatResArray[el[0].userLevelName] =
          el.length / usersQuizsCalcfilterAdmi.length;
        return { userLevelName: el[0].userLevelName, leng: el.length };
      });*/

    /*  const dataChartByAge = {
      labels: this.state.age_groups,
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(await usersQuizsCalcSortGroupByAgeResArray),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    this.setState({
      dataChartByAge: dataChartByAge,
    });

    var dataChartByEducat = {
      labels: getUserLevels().map((level) => level.name),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(await usersQuizsCalcSortGroupByEducatResArray),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    this.setState({
      dataChartByEducat: dataChartByEducat,
    }); */

    /**
        moyenneNoteAdmi = moyenne des points des questions / 2
        By Educat : nbre de particp Admis par cat de educat / nombre totale Admis
        By Age : nbre de particp Admis par cat de age  / nombre totale Admis
         */
  }

  /*   groupBy(collection, property) {
    var i = 0,
      val,
      index,
      values = [],
      result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  } */

  render() {
    const { user } = this.state;
    // //console.log(this.state.dataChartByEducat.labels);
    // //console.log(this.state.dataChartByAge.labels);
    //console.log(this.state.dataChartByAge.datasets);

    return (
      <div className="container-fluid">
        <Header />
        <div className="container">
          <main role="main" className="flex-shrink-0">
            <div className="container container-body">
              <div className="row">
                <div className="col-12">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Profile</span>
                    <span className="badge badge-secondary badge-pill">
                      <Link
                        className="btn btn-sm btn-outline-secondary"
                        to="/profile/edit"
                      >
                        Edit
                      </Link>
                    </span>
                  </h4>
                </div>
                <div className="col-md-6">
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Nom </h6>
                      </div>
                      <span className="text-muted">{user.name}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Email</h6>
                      </div>
                      <span className="text-muted">{user.email}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0"> Level </h6>
                      </div>
                      <span className="text-muted">{user.userLevel.name}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Age</h6>
                      </div>
                      <span className="text-muted">
                        <Moment format="YYYY/MM/DD">{user.age}</Moment>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold"> My best socre</div>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {this.state.infosObj.max}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          {" "}
                          My ranking among all participants
                        </div>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {this.state.userMyRanking}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          My ranking among all participants in my age groupe
                        </div>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {this.state.userMyRankingByAge}
                      </span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          My ranking among all participants in my educational
                          level
                        </div>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        {this.state.userMyRankingByEduat}
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              {/* <div className="row my-5">
                <div className="col-md-6">
                  <Card className="text-center">
                    <Card.Header>
                      <Card.Title>
                        percentage of partcipants with an above-avergae score by
                        age group
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {this.state.dataChartByAge.labels && (
                        <>
                          <Pie
                            data={this.state.dataChartByAge}
                            options={this.state.options}
                          />
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card className="text-center">
                    <Card.Header>
                      <Card.Title>
                        Percentage of partcipants with an above-avergae score by
                        educational level
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      {this.state.dataChartByEducat.labels && (
                        <>
                          <Pie
                            data={this.state.dataChartByEducat}
                            options={this.state.options}
                          />
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </div> 
              </div>*/}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withParams(Profile);
