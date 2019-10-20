import React from "react";
import PokeCard from "./PokeCard";
import { testData } from "./testMock.js";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("PokeCard Renders a pokemon card. When Card is Flipped", () => {
  localStorage.setItem("pokecard_shown", testData);
  const wrapper = shallow(<PokeCard data={testData} />);
  expect(wrapper.find(".name").text()).toEqual(testData.name);
  
});
test("PokeCard Renders a pokemon card. When Card is not Flipped", () => {
  localStorage.removeItem("pokecard_shown");
  const wrapper = shallow(<PokeCard data={testData} />);

  expect(wrapper.find(".pokeCardBack img").length).toBe(1);
  
});
