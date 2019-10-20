import React from 'react';
import SearchResults from './SearchResults';
import {testData} from "./testMock.js";
import {mount, shallow, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";


configure({ adapter: new Adapter() });

test("SearchResults renders the mock provided with same number of elements as the length of the mock", () => {
    const wrapper = shallow(<SearchResults results={testData} />);
    const element = wrapper.find("#resultParent").children();
    expect(element.length).toBe(testData.length);
});