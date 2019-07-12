import React, { Component } from "react";
import dataService from "../services/dataService";
import moment from "moment";
import urls from "../constants/urls";

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
        let speaker = undefined;
        if (!event.presenter_oids || event.presenter_oids.length == 0)
          speaker = {
            asset_url: urls.NO_IMAGE,
            person_display_last_name: "Unknown!"
          };
        else {
          const presenterId = event.presenter_oids[0];
          speaker = speakers.find(speaker => speaker.oid === presenterId);
        }
        const speakername = speaker.person_display_last_name;
        const speakerimage = speaker.asset_url;
        const speakerBio = speaker.bio;
        const speakerWebsite = speaker.website;
        const twitter_url = speaker.twitter_url;
        return (
          <div data-talk key={event.name}>
            <span className="pr-2" data-talk-time>
              <h3>
                {start} - {end}
              </h3>
            </span>
            <h4>{event.name}</h4>
            <h5 data-speaker-name>{speakername}</h5>
            <div className="row">
              <div className="col-auto">
                <img data-speaker-image src={speakerimage} />
              </div>
              <div className="col">
                <h6 data-bio dangerouslySetInnerHTML={{ __html: speakerBio }} />
                <div>
                  <a href={speakerWebsite} data-website>
                    {speakerWebsite}
                  </a>
                </div>
                <div>
                  <a href={twitter_url} data-twitter-handle>
                    Twitter:{twitter_url}
                  </a>
                </div>
              </div>
            </div>
            <h3>Talk Info</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: event.description
              }}
            />
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
