import React from "react";
import { mount, shallow } from "enzyme";
import Room from "./Room";
import urls from "../constants/urls";
import { async } from "q";

jest.mock("../services/dataService", () => {
  return {
    getData: async () => ({
      speakers: [
        {
          person_display_last_name: "Andrew Nesling",
          oid: "IJrac4kPt8",
          asset_url: "url",
          bio: "their bio",
          website: "https://hf.com",
          twitter_url: "https://yrl.com",
          facebook_url: "https://dfghjnm.com",
          linkedin_url: "https://sdfghfd.com"
        }
      ],
      talks: [
        {
          location_name: "room1",
          name: "talk 1",
          start_datetime: "2019-07-12T21:30:00Z",
          end_datetime: "2019-07-12T22:30:00Z",
          description: "Description 2",
          presenter_oids: ["IJrac4kPt8"]
        },
        {
          location_name: "room1",
          name: "talk 2",
          start_datetime: "2019-07-12T20:30:00Z",
          end_datetime: "2019-07-12T21:30:00Z",
          description: "Description 2",
          presenter_oids: []
        },
        {
          location_name: "room1",
          name: "talk 3",
          start_datetime: "2019-07-12T10:30:00Z",
          end_datetime: "2019-07-12T11:15:00Z",
          description: "Description 2",
          presenter_oids: ["IJrac4kPt8"]
        }
      ]
    })
  };
});

describe("room test suite", () => {
  let component = undefined;
  let props = { match: { params: { name: "room1" } } };

  beforeEach(() => {
    component = mount(<Room match={props.match} />);
  });

  it("renders", () => {
    expect(component).toHaveLength(1);
  });

  it("shows the room name", () => {
    expect(component.find("h2").text()).toBe(props.match.params.name);
  });

  it("lists the talk names", async () => {
    await component.update();
    expect(component.find("[data-talk]")).toHaveLength(2);
  });

  // it("shows the talk time", async () => {
  //   await component.update();
  //   expect(
  //     component
  //       .find("[data-talk-time]")
  //       .at(0)
  //       .text()
  //   ).toBe("21:30 - 22:30");
  // });

  // it("orders the time in ascending order", async () => {
  //   await component.update();
  //   let rooms = component.find("h3");
  //   expect(rooms.at(0).text()).toBe("21:30 - 22:30");
  // });

  it("does not show times in the past", async () => {
    await component.update();
    let rooms = component.find("[data-talk-time]");
    expect(rooms).toHaveLength(2);
  });

  it("shows the talk description", async () => {
    await component.update();
    expect(
      component
        .find("p")
        .at(1)
        .text()
    ).toBe("Description 2");
  });

  it("shows the last name of the speaker", async () => {
    await component.update();
    expect(
      component
        .find("[data-speaker-name]")
        .at(1)
        .text()
    ).toBe("Andrew Nesling");
  });

  it("displays the speaker's image", async () => {
    await component.update();
    expect(
      component
        .find("[data-speaker-image]")
        .at(1)
        .props().src
    ).toBe("url");
  });

  it("handles an event with no presenters", async () => {
    await component.update();

    expect(
      component
        .find("[data-speaker-image]")
        .at(0)
        .props().src
    ).toBe(urls.NO_IMAGE);
  });

  it("displays the speaker bio", async () => {
    await component.update();
    expect(
      component
        .find("[data-bio]")
        .at(1)
        .text()
    ).toBe("their bio");
  });

  it("displays the speaker website", async () => {
    await component.update();
    expect(
      component
        .find("[data-website]")
        .at(1)
        .text()
    ).toBe("https://hf.com");
  });

  it("it displays the twitter handle", async () => {
    await component.update();
    expect(
      component
        .find("[data-twitter-handle]")
        .at(1)
        .text()
    ).toBe("Twitter:https://yrl.com");
  });

  it("it displays the facebook handle", async () => {
    await component.update();
    expect(
      component
        .find("[data-facebook-handle]")
        .at(1)
        .text()
    ).toBe("Facebook:https://dfghjnm.com");
  });

  it("it displays the linkedin handle", async () => {
    await component.update();
    expect(
      component
        .find("[data-linkedin-handle]")
        .at(1)
        .text()
    ).toBe("LinkedIn:https://sdfghfd.com");
  });
});
