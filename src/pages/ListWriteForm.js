import React, { Component } from "react";
import Api from "../utils/Api";
import history from "../utils/history";

class ListWriteForm extends Component {
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
    const { title, contents } = this.state;
    const apiParams = {
      title: title,
      contents,
    };

    await Api.post("posts", apiParams);
    try {
      alert("등록이 완료되었습니다.");
      history.push("/main");
    } catch (error) {
      console.log("등록실패");
    }
  };
  render() {
    const { title, contents } = this.state;
    return (
      <div className="contents">
        <h1 className="page-header">학습노트 등록</h1>
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
              등록
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

export default ListWriteForm;
