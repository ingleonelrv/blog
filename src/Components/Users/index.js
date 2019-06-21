import React, { Component } from "react";
import { connect } from "react-redux";

import "./Users.css";
import * as usersActions from "../../Actions/usersAction";
import Spinner from "../Global/Spinner";
import NotFound from "../Global/NotFound";
import UsersTable from "./UsersTable";

class Users extends Component {
  componentDidMount() {
    this.props.getAll();
  }
  putContent = () => {
    if (this.props.loading) {
      return <Spinner />;
    }
    if (this.props.error) {
      return <NotFound message={this.props.error} />;
    }
    return <UsersTable />;
  };
  render() {
    console.log(this.props.loading);
    return (
      <div className="margin">
        <h1>Users</h1>
        {this.putContent()}
      </div>
    );
  }
}
const mapStateToProps = reducers => {
  return reducers.usersReducer;
};
export default connect(
  mapStateToProps,
  usersActions
)(Users);