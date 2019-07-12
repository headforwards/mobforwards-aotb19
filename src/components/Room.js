import React, { Component } from "react";
import dataService from "../services/dataService";
import moment from "moment";

export default class Room extends Component {
  constructor() {
    super();
    this.state = { events: [] };
  }

  async componentDidMount() {
    let data = await dataService.getData();
    this.setState({
      events: data.talks
    });
  }

  render() {
    const { params } = this.props.match;
    const { events } = this.state;

    const filteredEvents = events
      .filter(event => event.location_name === params.name)
      .map(event => {
        const displayDate = moment(event.start_datetime).format("HH:mm");

        return (
          <p data-talk key={event.name}>
            <span className="pr-2" data-talk-time>
              <strong>{displayDate}</strong>
            </span>
            {event.name}
          </p>
        );
      });

    return (
      <div>
        <h2>{params.name}</h2>
        {filteredEvents}
      </div>
    );
  }
}
