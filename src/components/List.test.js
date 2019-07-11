import { shallow } from 'enzyme';
import List from './list';
import React from 'react';
import dataService from '../services/dataService';
import { JestEnvironment } from '@jest/environment';

jest.mock('../services/dataService',()=>{
    return{
        rooms:()=>([{location_name:"studio 1"},{location_name:"studio 2"}])
    }
})


describe("Listtestsuite", () => {

    let expectedRooms = dataService.rooms();

    let component;

    beforeEach(() => {
        component = shallow(<List rooms={expectedRooms} />);
    })

    it("should retrieve rooms from data set", () => {
        expect(component.find("[data-room]")).toHaveLength(2);
    });

    it("should render the studio names in the component", () => {
        expect(component.find("[data-room]").at(0).text()).toBe("studio 1");
    });
})
