import React, { Component } from "react";

export default class Room extends Component {
  render() {
    const { params } = this.props.match;

    return (
      <div>
        <h1>{params.name}</h1>
        here be a list of speakers (well soon, we promise)
      </div>
    );
  }
}
