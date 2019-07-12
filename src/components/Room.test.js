import React from "react";
import { mount, shallow } from "enzyme";
import Room from "./Room";

jest.mock("../services/dataService", () => {
  return {
    getData: async () => ({
      talks: [
        {
          location_name: "room1",
          name: "talk 1",
          start_datetime: "2019-07-11T10:30:00Z",
          end_datetime: "2019-07-11T11:15:00Z"
        },
        {
          location_name: "room1",
          name: "talk 2",
          start_datetime: "2019-07-11T10:30:00Z",
          end_datetime: "2019-07-11T11:15:00Z"
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
    ).toBe("11:30");
  });
});
