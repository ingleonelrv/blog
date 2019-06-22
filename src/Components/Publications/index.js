import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../Actions/usersActions";
import * as publicationsActions from "../../Actions/publicationsActions";
import Loading from "../Global/Spinner";
import NotFound from "../Global/NotFound";
import "./Publications.css";

const { getAll: getAllUsers } = usersActions;
const { bringByUser: bringByUserPublications, openClose } = publicationsActions;

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
    if (!("publications_index" in this.props.usersReducer.users[index])) {
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
  putPosts = () => {
    const {
      usersReducer,
      usersReducer: { users },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { index }
      }
    } = this.props;
    //maybe is loading yet
    if (!users.length) return;
    //doing nothing because already drive in putUser
    if (usersReducer.error) return;
    if (publicationsReducer.loading) return <Loading />;
    if (publicationsReducer.error)
      return <NotFound message={publicationsReducer.error} />;
    //if users is loading mean that publications isn't load yet then return nothing
    if (!publications.length) return;
    //wait while load the post for the user
    if (!("publications_index" in users[index])) return;
    const { publications_index } = users[index];
    return this.showInfo(publications[publications_index], publications_index);
  };
  showInfo = (publications, publications_index) =>
    publications.map((publication, comment_index) => {
      return (
        <div
          key={publication.id}
          className="publication"
          onClick={() =>
            this.props.openClose(publications_index, comment_index)
          }
        >
          <h3>{publication.title}</h3>
          <p>{publication.body}</p>
        </div>
      );
    });
  render() {
    console.log(this.props);
    return (
      <div>
        {this.putUser()}
        {this.putPosts()}
      </div>
    );
  }
}
const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return { usersReducer, publicationsReducer };
};
const mapDispatchToProps = { getAllUsers, bringByUserPublications, openClose };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Publications);
