import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as tasksActions from "../../Actions/tasksActions";

import Loading from "../Global/Spinner";
import NotFound from "../Global/NotFound";

class New extends Component {
  componentDidMount() {
    const {
      match: {
        params: { us_id, tk_id }
      },
      tasks,
      changeUserId,
      changeTitle,
      clearForm
    } = this.props;
    if (us_id && tk_id) {
      const task = tasks[us_id][tk_id];
      changeUserId(task.userId);
      changeTitle(task.title);
    } else {
      clearForm();
    }
  }
  changeUserId = e => {
    this.props.changeUserId(e.target.value);
  };
  changeTitle = e => {
    this.props.changeTitle(e.target.value);
  };
  handleSave = () => {
    const {
      userId,
      title,
      match: {
        params: { us_id, tk_id }
      },
      tasks,
      addTask,
      editTask
    } = this.props;
    const newTask = {
      userId,
      title,
      completed: false
    };
    if (us_id && tk_id) {
      const task = tasks[us_id][tk_id];
      const editedTask = {
        ...newTask,
        completed: task.completed,
        id: task.id
      };
      editTask(editedTask);
    } else {
      addTask(newTask);
    }
  };
  disableButton = () => {
    const { userId, title, loading } = this.props;
    if (loading) return true;
    if (!userId || !title) return true;
    return false;
  };
  showAction = () => {
    const { loading, error } = this.props;
    if (loading) return <Loading />;
    if (error) return <NotFound message={error} />;
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
        <button onClick={this.handleSave} disabled={this.disableButton()}>
          Save
        </button>
        {this.showAction()}
        {this.props.redirect ? <Redirect to="/tasks" /> : null}
      </div>
    );
  }
}
const mapStateToProps = ({ tasksReducer }) => tasksReducer;
export default connect(
  mapStateToProps,
  tasksActions
)(New);
