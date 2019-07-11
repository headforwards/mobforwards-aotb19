import { shallow } from 'enzyme';
import List from './list';
import React from 'react';
import dataService from '../services/dataService';
import { JestEnvironment } from '@jest/environment';

jest.mock('../services/dataService', () => {
    return {
        getData: async () => { }
    };
})


describe("Listtestsuite", () => {

    let component, expectedRooms;

    beforeEach(() => {
        expectedRooms = [{ location_name: "studio 1" }, { location_name: "studio 2" }];

        component = shallow(<List rooms={expectedRooms} />);
    })

    it("should retrieve rooms from data set", () => {
        expect(component.find("[data-room]")).toHaveLength(2);
    });

    it("should render the studio names in the component", () => {
        expect(component.find("[data-room]").at(0).text()).toBe("studio 1");
    });
})
