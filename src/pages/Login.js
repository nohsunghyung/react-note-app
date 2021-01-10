import React, { Component } from "react";
import Api from "../utils/Api";
import history from "../utils/history";
import { Redirect } from "react-router-dom";

// 로그인
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  onChangeForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  onSubmitForm = (e) => {
    e.preventDefault();
    const apiParams = {
      username: this.state.username,
      password: this.state.password,
    };
    Api.post("/login", apiParams).then(({ data }) => {
      const token = data.token;
      alert(`${data.user.username}님 환영합니다.`);
      localStorage.setItem("token", token);
      this.props.login(token);
      history.push("/main");
    });
  };
  render() {
    const { token } = this.props;
    let displayComponents = null;
    if (token) {
      displayComponents = <Redirect to={"/main"} />;
    } else {
      displayComponents = (
        <div>
          <h1 className="page-header">로그인</h1>
          <div className="contents">
            <div className="form-wrapper form-wrapper-sm">
              <form className="form" onSubmit={this.onSubmitForm}>
                <div>
                  <label htmlFor="username">id:</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    onChange={this.onChangeForm}
                  />
                </div>
                <div>
                  <label htmlFor="password">pw: </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={this.onChangeForm}
                  />
                </div>
                <button type="submit" className="btn">
                  로그인
                </button>
              </form>
              <p className="log"></p>
            </div>
          </div>
        </div>
      );
    }
    return displayComponents;
  }
}

export default Login;
