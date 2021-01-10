import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "./components/common/AppHeader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import ListWriteForm from "./pages/ListWriteForm";
import ListEditForm from "./pages/ListEditForm";
import AuthRoute from "./pages/AuthRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token") || "",
    };
  }
  login = (token) => {
    this.setState({
      token,
    });
  };
  logout = () => {
    this.setState({
      token: "",
    });
  };
  render() {
    console.log("app 렌더");
    const { token } = this.state;
    return (
      <div>
        <AppHeader token={token} logout={this.logout} />
        <Switch>
          <AuthRoute
            token={token}
            exact
            path={["/", "/main"]}
            component={MainPage}
          />
          <Route
            exact
            path="/login"
            render={() => <Login token={token} login={this.login} />}
          />
          <Route exact path="/signup" component={Signup} />
          <AuthRoute
            token={token}
            exact
            path="/write"
            component={ListWriteForm}
          />
          <AuthRoute
            token={token}
            exact
            path="/edit/:id"
            component={ListEditForm}
          />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
