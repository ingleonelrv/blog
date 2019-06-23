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
    const { tasks } = this.props;
    const byUser = {
      ...tasks[us_id]
    };
    return Object.keys(byUser).map(tk_id => (
      <div key={tk_id}>
        <input type="checkbox" defaultChecked={byUser[tk_id].completed} />
        {byUser[tk_id].title}
        <button className="m-left">
          <Link to={`/tasks/new/${us_id}/${tk_id}`}>Edit</Link>
        </button>
        <button className="m-left">Delete</button>
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
