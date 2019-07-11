import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {mount, shallow} from 'enzyme'
import 'jest-enzyme'
import dataService from './services/dataService';

jest.mock('./services/dataService', () => {
  return {
    rooms: jest.fn(() => ([{location_name: 'n1'},{location_name: 'n2'}]))
  }
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('app test suite',()=> {
  it('has rendered list component',() => {
    let component = mount(<App/>);
    let rooms = dataService.rooms();
    expect(component.find("[data-room-list]")).toHaveLength(1);
  });
  
  it('data service rooms is called',() => {
    let component = shallow(<App/>);
    expect(dataService.rooms).toHaveBeenCalled();
  });
})
