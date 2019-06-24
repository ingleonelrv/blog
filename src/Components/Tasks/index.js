import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Tasks.css";

import Loading from "../Global/Spinner";
import NotFound from "../Global/NotFound";

import * as tasksActions from "../../Actions/tasksActions";

class Tasks extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tasks).length) {
      this.props.getAll();
    }
  }
  //IF remove one task and need to reload
  componentDidUpdate() {
    const { tasks, loading, getAll } = this.props;
    //&& !loading for not reload twice
    if (!Object.keys(tasks).length && !loading) {
      getAll();
    }
  }
  showContent = () => {
    const { tasks, loading, error } = this.props;
    if (error) return <NotFound message={error} />;
    if (loading) return <Loading />;
    //Isn't an array then
    return Object.keys(tasks).map(us_id => (
      <div key={us_id}>
        <h2>User {us_id}</h2>
        <div className="tasksContainer">{this.putTask(us_id)}</div>
      </div>
    ));
  };
  putTask = us_id => {
    const { tasks, changeCheckbox, remove } = this.props;
    const byUser = {
      ...tasks[us_id]
    };
    return Object.keys(byUser).map(tk_id => (
      <div key={tk_id}>
        <input
          type="checkbox"
          defaultChecked={byUser[tk_id].completed}
          onChange={() => changeCheckbox(us_id, tk_id)}
        />
        {byUser[tk_id].title}
        <button className="m-left">
          <Link to={`/tasks/new/${us_id}/${tk_id}`}>Edit</Link>
        </button>
        <button className="m-left" onClick={() => remove(tk_id)}>
          Delete
        </button>
      </div>
    ));
  };
  render() {
    return (
      <div>
        <button>
          <Link to="/tasks/new">Save</Link>
        </button>
        {this.showContent()}
      </div>
    );
  }
}
const mapStateToProps = ({ tasksReducer }) => {
  return tasksReducer;
};
export default connect(
  mapStateToProps,
  tasksActions
)(Tasks);
