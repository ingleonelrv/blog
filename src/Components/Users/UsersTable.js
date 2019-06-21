import React from "react";
import { connect } from "react-redux";

const UsersTable = props => {
  const putData = () =>
    props.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
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
