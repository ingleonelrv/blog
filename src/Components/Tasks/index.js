import React, { Component } from "react";
import { connect } from "react-redux";

import * as tasksActions from "../../Actions/tasksActions";

class Tasks extends Component {
  componentDidMount() {
    this.props.getAll();
  }
  render() {
    console.log(this.props);
    return <div>Tasks Component</div>;
  }
}
const mapStateToProps = ({ tasksReducer }) => {
  return tasksReducer;
};
export default connect(
  mapStateToProps,
  tasksActions
)(Tasks);
