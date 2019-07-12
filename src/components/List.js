import React, { Component } from "react";
import dataService from "../services/dataService";
import { NavLink, withRouter } from "react-router-dom";

export class List extends Component {
  state = {
    rooms: [],
    speakers: [],
    events: []
  };

  async componentDidMount() {
    var db = await dataService.getData();

    this.setState({
      rooms: db.rooms,
      speakers: db.speakers,
      events: db.events
    });
  }

  render() {
    const rooms = this.state.rooms;
    return (
      <ul data-room-list>
        {rooms.length &&
          rooms.length > 0 &&
          rooms.map((room, i) => (
            <li key={i} data-room style={{ listStyle: "none" }}>
              <NavLink to={"/rooms/" + room.location_name}>
                {room.location_name}
              </NavLink>
            </li>
          ))}
      </ul>
    );
  }
}

export default withRouter(List);
