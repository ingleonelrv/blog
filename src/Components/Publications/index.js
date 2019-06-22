import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../Actions/usersActions";
import * as publicationsActions from "../../Actions/publicationsActions";

const { getAll: getAllUsers } = usersActions;
const { bringByUser: bringByUserPublications } = publicationsActions;

class Publications extends Component {
  async componentDidMount() {
    if (!this.props.usersReducer.users.length) {
      await this.props.getAllUsers();
    }
    this.props.bringByUserPublications(this.props.match.params.index);
  }
  render() {
    console.log(this.props);
    return <div>{this.props.match.params.index}</div>;
  }
}
const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return { usersReducer, publicationsReducer };
};
const mapDispatchToProps = { getAllUsers, bringByUserPublications };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Publications);
