import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/front/home";
import HomeAdmin from "./pages/admin/home";
import UsersAdmin from "./pages/admin/users";
import LoginAdmin from "./pages/admin/login";
import Singup from "./pages/front/singup";
import Login from "./pages/front/login";
import IndexUserLevelAdmin from "./pages/admin/userLevel/index";
import EditUserLevelAdmin from "./pages/admin/userLevel/edit";
import NewUserLevelAdmin from "./pages/admin/userLevel/new";
import UserQuizAdmin from "./pages/admin/userQuiz";
import IndexQuizAdmin from "./pages/admin/quiz/index";
import NewQuizAdmin from "./pages/admin/quiz/new";
import EditQuizAdmin from "./pages/admin/quiz/edit";
import ViewQuizAdmin from "./pages/admin/quiz/view";
import EditCategoryAdmin from "./pages/admin/category/edit";
import ViewCategoryAdmin from "./pages/admin/category/view";
import NewCategoryAdmin from "./pages/admin/category/new";
import EditQuestionAdmin from "./pages/admin/question/edit";
import ViewQuestionAdmin from "./pages/admin/question/view";
import NewQuestionAdmin from "./pages/admin/question/new";
import EditQuestionOptionAdmin from "./pages/admin/questionOption/edit";
import ViewQuestionOptionAdmin from "./pages/admin/questionOption/view";
import NewQuestionOptionAdmin from "./pages/admin/questionOption/new";
import EditQuestionChildAdmin from "./pages/admin/questionChild/edit";
import ViewQuestionChildAdmin from "./pages/admin/questionChild/view";
import NewQuestionChildAdmin from "./pages/admin/questionChild/new";
import PrivateRouteFront from "./services/PrivateRouteFront";
import PublicRouteFront from "./services/PublicRouteFront";
import PublicRouteAdmin from "./services/PublicRouteAdmin";
import PrivateRouteAdmin from "./services/PrivateRouteAdmin";
import Profile from "./pages/front/profile";
import ProfileEdit from "./pages/front/profileEdit";
import Category from "./pages/front/category";
import QuizQuestions from "./pages/front/quizQuestions";

//the list of all possible route

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* admin page */}
          <Route
            path="/admin/users/quiz/category"
            element={
              <PrivateRouteAdmin>
                <HomeAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/users/quiz"
            element={
              <PrivateRouteAdmin>
                <UserQuizAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/user-level/:id"
            element={
              <PrivateRouteAdmin>
                <EditUserLevelAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/user-level/new"
            element={
              <PrivateRouteAdmin>
                <NewUserLevelAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/user-level"
            element={
              <PrivateRouteAdmin>
                <IndexUserLevelAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRouteAdmin>
                <UsersAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-option/new/:quest_id"
            element={
              <PrivateRouteAdmin>
                <NewQuestionOptionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-option/:id/view"
            element={
              <PrivateRouteAdmin>
                <ViewQuestionOptionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-option/:id"
            element={
              <PrivateRouteAdmin>
                <EditQuestionOptionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-child/new/:quest_id"
            element={
              <PrivateRouteAdmin>
                <NewQuestionChildAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-child/:id/view"
            element={
              <PrivateRouteAdmin>
                <ViewQuestionChildAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question-child/:id"
            element={
              <PrivateRouteAdmin>
                <EditQuestionChildAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question/new/:cat_id"
            element={
              <PrivateRouteAdmin>
                <NewQuestionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question/:id/view"
            element={
              <PrivateRouteAdmin>
                <ViewQuestionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/question/:id"
            element={
              <PrivateRouteAdmin>
                <EditQuestionAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/category/new/:quiz_id"
            element={
              <PrivateRouteAdmin>
                <NewCategoryAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/category/:id/view"
            element={
              <PrivateRouteAdmin>
                <ViewCategoryAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/category/:id"
            element={
              <PrivateRouteAdmin>
                <EditCategoryAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/quiz/new"
            element={
              <PrivateRouteAdmin>
                <NewQuizAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/quiz/:id/view"
            element={
              <PrivateRouteAdmin>
                <ViewQuizAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/quiz/:id"
            element={
              <PrivateRouteAdmin>
                <EditQuizAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/quiz"
            element={
              <PrivateRouteAdmin>
                <IndexQuizAdmin />
              </PrivateRouteAdmin>
            }
          />
          <Route
            path="/admin/login"
            element={
              <PublicRouteAdmin>
                <LoginAdmin />
              </PublicRouteAdmin>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRouteAdmin>
                <HomeAdmin />
              </PrivateRouteAdmin>
            }
          />

          {/* front page */}
          <Route
            path="/login"
            element={
              <PublicRouteFront>
                <Login />
              </PublicRouteFront>
            }
          />
          <Route
            path="/singup"
            element={
              <PublicRouteFront>
                <Singup />
              </PublicRouteFront>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PrivateRouteFront>
                <ProfileEdit />
              </PrivateRouteFront>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRouteFront>
                <Profile />
              </PrivateRouteFront>
            }
          />
          <Route
            path="/category/:id"
            element={
              <PrivateRouteFront>
                <Category />
              </PrivateRouteFront>
            }
          />
          <Route
            path="/quiz/:id/:user_quest_id"
            element={
              <PrivateRouteFront>
                <QuizQuestions />
              </PrivateRouteFront>
            }
          />
          <Route
            exact
            path="/"
            element={
              <PrivateRouteFront>
                <Home />
              </PrivateRouteFront>
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
