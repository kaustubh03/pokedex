import { PokedexBundle } from "./pokedex/exportBundle";


export const getModuleName = () => {
  console.log('--1');
  const params = new URLSearchParams(window.location.search);
  const feature = params.get('feature') || 'pokedex';

  //Dev & production switching
  const switchMe = feature;
  switch (switchMe) {
    case 'pokedex':
      return PokedexBundle(switchMe);

    // For Multiple Apps same Projects can be used.
    default:
      return PokedexBundle(switchMe);
  }
};
