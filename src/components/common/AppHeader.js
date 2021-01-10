import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import history from "../../utils/history";

// 헤더
class AppHeader extends Component {
  logout = () => {
    this.props.logout();
    localStorage.removeItem("token");
    history.push("/login");
  };
  render() {
    console.log("appheader렌더");
    const { token } = this.props;
    return (
      <header>
        <div>
          <NavLink to={token ? "/main" : "/login"} className="logo">
            NOTE
          </NavLink>
        </div>
        <div className="navigations">
          {token ? (
            <button type="button" onClick={this.logout}>
              로그아웃
            </button>
          ) : (
            <>
              <NavLink to="/login">로그인</NavLink>
              <NavLink to="/signup">회원가입</NavLink>
            </>
          )}
        </div>
      </header>
    );
  }
}

export default AppHeader;
