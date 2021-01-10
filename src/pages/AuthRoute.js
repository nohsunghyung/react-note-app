import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

class AuthRoute extends Component {
  render() {
    console.log("authRoute 렌더");
    const { component: Components, token, ...rest } = this.props;
    let displayComponents = null;
    if (token) {
      displayComponents = (
        <Route
          {...rest}
          render={(props) => {
            return <Components {...props} />;
          }}
        />
      );
    } else {
      alert("로그인정보가 없습니다. 메인화면으로 이동합니다");
      displayComponents = <Redirect to={"/login"} />;
    }
    return displayComponents;
  }
}

export default AuthRoute;
