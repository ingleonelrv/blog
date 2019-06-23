import React, { Component } from "react";
import { connect } from "react-redux";

import * as tasksActions from "../../Actions/tasksActions";

class New extends Component {
  changeUserId = e => {
    this.props.changeUserId(e.target.value);
  };
  changeTitle = e => {
    this.props.changeTitle(e.target.value);
  };
  render() {
    const { userId, title } = this.props;
    return (
      <div>
        <h1>Save Task</h1>
        User Id:
        <input value={userId} type="number" onChange={this.changeUserId} />
        <br />
        <br />
        Title:
        <input value={title} onChange={this.changeTitle} />
        <br />
        <br />
        <button>Save</button>
      </div>
    );
  }
}
const mapStateToProps = ({ tasksReducer }) => tasksReducer;
export default connect(
  mapStateToProps,
  tasksActions
)(New);