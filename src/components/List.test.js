import { shallow, mount } from "enzyme";
import { List } from "./list";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("../services/dataService", () => {
  return {
    getData: async () => ({
      rooms: [{ location_name: "studio 1" }, { location_name: "name" }]
    })
  };
});

describe("Listtestsuite", () => {
  let component;

  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );
  });

  it("should retrieve rooms from data set", async () => {
    await component.update();
    expect(component.find("[data-room]")).toHaveLength(2);
  });

  it("should render the studio names in the component", async () => {
    await component.update();

    expect(
      component
        .find("[data-room]")
        .at(0)
        .text()
    ).toBe("studio 1");
  });
});
