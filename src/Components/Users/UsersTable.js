import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UsersTable = props => {
  const putData = () =>
    props.users.map((user, index) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>
          <Link to={`/publications/${index}`}>
            <div className="eye-solid icon" />
          </Link>
        </td>
      </tr>
    ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Link</th>
          </tr>
        </thead>
        <thead>{putData()}</thead>
      </table>
    </div>
  );
};
const mapStateToProps = reducers => {
  return reducers.usersReducer;
};
export default connect(mapStateToProps)(UsersTable);
