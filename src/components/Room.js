import React, { Component } from "react";
import dataService from "../services/dataService";
import moment from "moment";

export default class Room extends Component {
  constructor() {
    super();
    this.state = { events: [], speakers: [] };
  }

  async componentDidMount() {
    let data = await dataService.getData();
    this.setState({
      events: data.talks,
      speakers: data.speakers
    });
  }

  render() {
    const { params } = this.props.match;
    const { events, speakers } = this.state;

    const filteredEvents = events
      .filter(event => {
        const endDate = moment(event.end_datetime);
        return event.location_name === params.name && endDate > moment();
      })
      .sort((a, b) => {
        const startDateA = moment(a.start_datetime);
        const startDateB = moment(b.start_datetime);

        return startDateA.valueOf() - startDateB.valueOf();
      })
      .map(event => {
        const start = moment(event.start_datetime).format("HH:mm");
        const end = moment(event.end_datetime).format("HH:mm");
        const presenterId = event.presenter_oids[0];
        const speakername = speakers.find(
          speaker => speaker.oid === presenterId
        ).person_display_last_name;
        return (
          <div data-talk key={event.name}>
            <span className="pr-2" data-talk-time>
              <h3>
                {start} - {end}
              </h3>
            </span>
            <h4>{event.name}</h4>
            <h5 data-speaker-name>{speakername}</h5>
            <p>{event.description}</p>
          </div>
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
