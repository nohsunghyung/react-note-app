import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Api from "../utils/Api";
import history from "../utils/history";

class ListEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: "",
    };
  }
  onChangeValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };
  onSubmitForm = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const { title, contents } = this.state;
    const apiParams = {
      _id: id,
      title,
      contents,
    };

    await Api.put(`posts/${id}`, apiParams);
    try {
      alert("수정되었습니다.");
      history.push("/main");
    } catch (error) {
      console.log("등록실패");
    }
  };
  fetchListInfo = async () => {
    const id = this.props.match.params.id;
    console.log(this.props);
    const { data } = await Api.get(`posts/${id}`);
    try {
      return data;
    } catch (error) {}
  };
  componentDidMount() {
    this.fetchListInfo().then(({ title, contents }) => {
      this.setState({
        title,
        contents,
      });
    });
  }
  render() {
    const { title, contents } = this.state;
    return (
      <div className="contents">
        <h1 className="page-header">학습노트 수정</h1>
        <div className="form-wrapper">
          <form className="form" onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={this.onChangeValue}
              />
            </div>
            <div>
              <label htmlFor="contents">contents</label>
              <textarea
                name=""
                id="contents"
                name="contents"
                value={contents}
                placeholder="내용을 입력해주세요."
                onChange={this.onChangeValue}
              ></textarea>
              <div className="validation-chk">숫자체크</div>
            </div>
            <button type="submit" className="btn">
              수정완료
            </button>
            <button type="button" className="btn outline">
              취소
            </button>
          </form>
          {/* <p className="log" v-if="logState">
            게시물이 이미 존재합니다.
          </p> */}
        </div>
      </div>
    );
  }
}

export default withRouter(ListEditForm);
