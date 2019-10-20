import React from "react";
import Home from "./Home";
import { loadingData, successData } from "./testMock.js";
import { mount, configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DotLoader from "../../shared/DotLoader";

configure({ adapter: new Adapter() });

test("If API is Loading. Show Loader", () => {
  const wrapper = mount(
    <Home getAllPokemonList={() => {}} pokemons={loadingData} />
  );
  expect(wrapper.find(DotLoader).length).toBe(1);
});

describe("Home", () => {
  it('should render correctly', () => {
    const component = shallow(
      <Home getAllPokemonList={() => {}} pokemons={successData} />
    );
    expect(component).toMatchSnapshot();
  });
});