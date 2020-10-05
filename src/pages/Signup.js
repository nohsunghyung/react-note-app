import React, { Component } from "react";
import Api from "../utils/Api";
import history from "../utils/history";

// 회원가입
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      nickname: "",
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
      nickname: this.state.nickname,
    };
    // Api.post("http://localhost:3000/signup", apiParams).then((res) => {
    //   console.log(res);
    // });
    Api.post("signup", apiParams).then((res) => {
      alert(
        `${res.data.username}님 가입축하드립니다.로그인페이지로 이동합니다.`
      );
      history.push("/login");
    });
  };
  render() {
    return (
      <div>
        <h1 className="page-header">회원가입</h1>
        <div className="contents">
          <div className="form-wrapper form-wrapper-sm">
            <form action="" className="form" onSubmit={this.onSubmitForm}>
              <div>
                <label htmlFor="username">id:</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={this.onChangeForm}
                />
              </div>
              <div>
                <label htmlFor="password">pw: </label>
                <input
                  id="password"
                  name="password"
                  type="text"
                  onChange={this.onChangeForm}
                />
              </div>
              <div>
                <label htmlFor="nickname">nickname: </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  onChange={this.onChangeForm}
                />
              </div>
              <button type="submit" className="btn">
                회원 가입
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
