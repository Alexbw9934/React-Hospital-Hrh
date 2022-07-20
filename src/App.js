import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const JoinWithUs = React.lazy(() => import("./views/home/JoinWithUs"));
const Landing = React.lazy(() => import("./views/home/Landing"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Confirm = React.lazy(() => import("./views/pages/confirm/Confirm"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
// const Drag.html = React.lazy(() => import('./views/formbuilder/Drag.html'));

axios.defaults.baseURL = "http://5.9.111.198:13880/api/";
axios.defaults.headers.common["Authorization"] =
  "Bearer" + localStorage.getItem("login");
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              name="Landing"
              render={(props) => <Landing {...props} />}
            />
            <Route
              exact
              path="/JoinWithUs"
              name="JoinWithUs"
              render={(props) => <JoinWithUs {...props} />}
            />
            <Route
              exact
              path="/Login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/Confirm"
              name="Confirmation "
              render={(props) => <Confirm {...props} />}
            />
            <Route
              exact
              path="/register/:candidateType"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
            {/* <Route exact path="/frombuilder/Drag.html" name="Drag" render={props => <TheLayout {...props}/>}  /> */}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
