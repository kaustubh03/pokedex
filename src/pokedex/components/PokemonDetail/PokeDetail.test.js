import React from "react";
import PokemonDetail from "./PokemonDetail";
import { loadingData, successData } from "./testMock.js";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test("If API is Loading. Show Loader", () => {
  const wrapper = mount(
    <PokemonDetail getPokemonDetails={()=>{}} pokemonDetail={loadingData} />
  );
  expect(wrapper.find(".loaderContainer .wrapper img").length).toBe(1);
});
test("If API is Successful. Render Component", () => {
  const wrapper = mount(
    <PokemonDetail getPokemonDetails={() => {}} pokemonDetail={successData} />
  );
  expect(wrapper.find(".detailParent").length).toBe(1);
});

