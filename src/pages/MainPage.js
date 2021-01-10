import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import history from "../utils/history";
import Api from "../utils/Api";

// 메인페이지
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsList: [],
    };
  }
  fetchList = async () => {
    const { data } = await Api.get("posts");
    try {
      this.setState({
        postsList: data.posts,
      });
    } catch (error) {
      console.log("실패");
    }
  };
  gotoEdit = (postId) => {
    history.push(`edit/${postId}`);
  };
  deleteItem = async (postId) => {
    await Api.delete(`posts/${postId}`);
    try {
      alert("삭제되었습니다");
      this.fetchList();
    } catch (error) {}
  };
  componentDidMount() {
    this.fetchList();
  }
  render() {
    const { postsList } = this.state;
    return (
      <div>
        <h1 className="page-header">학습노트 리스트</h1>
        <div className="main list-container contents">
          <ul>
            {postsList.length
              ? postsList.map((list) => {
                  return (
                    <li key={list._id}>
                      <div className="post-title">{list.title}</div>
                      <div className="post-contents">{list.contents}</div>
                      <div className="post-time">
                        {list.createdAt}
                        <i
                          className="icon ion-md-create"
                          onClick={() => this.gotoEdit(list._id)}
                        ></i>
                        <i
                          className="icon ion-md-trash"
                          onClick={() => this.deleteItem(list._id)}
                        ></i>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
        {/* <div className="empty-content">
          <h3>등록된 학습노트가 없습니다.</h3>
        </div> */}
        <NavLink to={"/write"} className="create-button">
          <i className="ion-md-add"></i>
        </NavLink>
      </div>
    );
  }
}

export default withRouter(MainPage);
