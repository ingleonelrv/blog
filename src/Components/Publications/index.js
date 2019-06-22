import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../Actions/usersActions";
import * as publicationsActions from "../../Actions/publicationsActions";
import Loading from "../Global/Spinner";
import NotFound from "../Global/NotFound";

const { getAll: getAllUsers } = usersActions;
const { bringByUser: bringByUserPublications } = publicationsActions;

class Publications extends Component {
  async componentDidMount() {
    const {
      getAllUsers,
      bringByUserPublications,
      match: {
        params: { index }
      }
    } = this.props;
    //why don't desestructure usersReducer? Because is a state than can be updated and componentDidMount only exec once
    if (!this.props.usersReducer.users.length) {
      await getAllUsers();
    }
    if (this.props.usersReducer.error) return;
    if (!("publications_key" in this.props.usersReducer.users[index])) {
      bringByUserPublications(index);
    }
  }
  putUser = () => {
    const {
      usersReducer,
      match: {
        params: { index }
      }
    } = this.props;
    //maybe yet doesn't have been the users
    if (!usersReducer.users.length || usersReducer.loading) return <Loading />;
    if (usersReducer.error) return <NotFound message={usersReducer.error} />;
    const { name } = usersReducer.users[index];
    return <h1>Publications of {name}</h1>;
  };

  render() {
    console.log(this.props);
    return <div>{this.putUser()}</div>;
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
