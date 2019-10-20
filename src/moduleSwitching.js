import { PokedexBundle } from "./pokedex/exportBundle";

/* global DEV_MODE_APP */

export const getModuleName = () => {
  console.log('--1');
  const params = new URLSearchParams(window.location.search);
  const feature = params.get('feature') || 'pokedex';

  //Dev & production switching
  const switchMe = DEV_MODE_APP[3] ? DEV_MODE_APP[3] : feature;
  switch (switchMe) {
    case 'pokedex':
      return PokedexBundle(switchMe);

    // For Multiple Apps same Projects can be used.
    default:
      return PokedexBundle(switchMe);
  }
};
