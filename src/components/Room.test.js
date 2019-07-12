import React from "react";
import { mount, shallow } from "enzyme";
import Room from "./Room";
import { async } from "q";

jest.mock("../services/dataService", () => {
  return {
    getData: async () => ({
      speakers: [
        {
          person_display_last_name: "Andrew Nesling",
          oid: "IJrac4kPt8"
        }
      ],
      talks: [
        {
          location_name: "room1",
          name: "talk 1",
          start_datetime: "2019-07-12T21:30:00Z",
          end_datetime: "2019-07-12T22:30:00Z",
          description: "Description 1",
          presenter_oids: ["IJrac4kPt8"]
        },
        {
          location_name: "room1",
          name: "talk 2",
          start_datetime: "2019-07-12T20:30:00Z",
          end_datetime: "2019-07-12T21:30:00Z",
          description: "Description 2",
          presenter_oids: ["IJrac4kPt8"]
        },
        {
          location_name: "room1",
          name: "talk 3",
          start_datetime: "2019-07-12T10:30:00Z",
          end_datetime: "2019-07-12T11:15:00Z",
          description: "Description 3",
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

  it("shows the talk time", async () => {
    await component.update();
    expect(
      component
        .find("[data-talk-time]")
        .at(0)
        .text()
    ).toBe("21:30 - 22:30");
  });

  it("orders the time in ascending order", async () => {
    await component.update();
    let rooms = component.find("h3");
    expect(rooms.at(0).text()).toBe("21:30 - 22:30");
  });

  it("does not show times in the past", async () => {
    await component.update();
    let rooms = component.find("h3");
    expect(rooms).toHaveLength(2);
  });

  it("shows the talk description", async () => {
    await component.update();
    expect(
      component
        .find("p")
        .at(0)
        .text()
    ).toBe("Description 2");
  });

  it("shows the last name of the speaker", async () => {
    await component.update();
    expect(
      component
        .find("[data-speaker-name]")
        .at(0)
        .text()
    ).toBe("Andrew Nesling");
  });
});
