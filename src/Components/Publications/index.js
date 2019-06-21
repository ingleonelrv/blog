import React, { Component } from "react";

class Publications extends Component {
  render() {
    return <div>{this.props.match.params.index}</div>;
  }
}

export default Publications;
