import React, { Component } from "react";
import dataService from "../services/dataService";

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
        return (
          <p data-talk key={event.name}>
            {event.name}
            <span data-talk-time>{event.start_datetime}</span>
          </p>
        );
      });

    return (
      <div>
        <h1>{params.name}</h1>
        {filteredEvents}
      </div>
    );
  }
}
