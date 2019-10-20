import React from 'react';
import Search from './Search';
import {mount, shallow, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


configure({ adapter: new Adapter() });

test("Renders Search Input", () => {
    const wrapper = shallow(<Search />);
    const element = wrapper.find("input");
    expect(element.length).toBe(1);
});