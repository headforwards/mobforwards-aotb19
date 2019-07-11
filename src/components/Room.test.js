import React from "react";
import { shallow } from "enzyme";
import Room from "./Room";

describe("room test suite", () => {
  let component = undefined;

  beforeEach(() => {
    component = shallow(<Room />);
  });

  it("renders so there", () => {
    expect(component).toHaveLength(1);
  });
});
