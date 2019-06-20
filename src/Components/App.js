import React, { Component } from "react";
import trae from "trae";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      error: null
    };
  }
  async componentDidMount() {
    const response = await trae.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.setState({
      users: response.data
    });
  }
  putData = () =>
    this.state.users.map(user => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));
  render() {
    return (
      <div className="margin">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Link</th>
            </tr>
          </thead>
          <thead>{this.putData()}</thead>
        </table>
      </div>
    );
  }
}
export default App;
