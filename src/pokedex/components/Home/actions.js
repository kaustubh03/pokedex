/*
  @Module : Pokedex
  @Component : Pokedex Search
  @Type : Action Creator
  @Description : Action for Pokedex Home.
  @Author : Kaustubh Saxena
*/

/*
  Action Type Constants
*/

import {
  FETCH_ALL_POKEMONS_LOADING,
  FETCH_ALL_POKEMONS_SUCCESS,
  FETCH_ALL_POKEMONS_FAILURE,
  FETCH_ALL_POKEMONS_CLEAR,
  FETCH_POKEMON_CARD_LOADING,
  FETCH_POKEMON_CARD_SUCCESS,
  FETCH_POKEMON_CARD_FAILURE,
  FETCH_POKEMON_CARD_CLEAR
} from '../../constants/actionTypes';

/*
  Fetch Wrapper used to hit API.
*/
import httpFetch from '../../utils/http';
/*
  Utility Imports
*/
import { fetchAllPokemons } from '../../utils/urlconfig';


let headers = {
  'Cache-Control': 'no-cache',
  'Accept':'application/json'
};

/*
  @Purpose : Get All Pokemons
  @System : PokeAPI
  @params : offset=number, limit=number

  P.S. - To optimise performance we can bring data in chunks and modify the value.
  Todo -- Optimise API Data to bring in chunks.
*/

export const getAllPokemonList = (offset = 0, limit = 1000) => {
    let url = `${fetchAllPokemons()}?offset=${offset}&limit=${limit}`;
  return {
    types: [
        FETCH_ALL_POKEMONS_LOADING,
        FETCH_ALL_POKEMONS_SUCCESS,
        FETCH_ALL_POKEMONS_FAILURE
    ],
    promise: () =>
        httpFetch(url, { headers })
  };
};
/*
  @Purpose : Get All Pokemons from Previously Saved List
  @System : Self
*/

export const rehydratePokemonList = () => {
    let localStorageObj =
      localStorage.getItem("pokemons") &&
      JSON.parse(localStorage.getItem("pokemons"));
    
    return {
      type: FETCH_ALL_POKEMONS_SUCCESS,
      result: localStorageObj
    };
};

/*
  @Purpose : Clear Fetched Pokemons from Redux Store
  @System : Self
*/
export function clearPokemonList(nextOption) {
  return {
    type: FETCH_ALL_POKEMONS_CLEAR,
    result: {}
  };
}

/*
  @Purpose : Get Selected Pokemon Details
  @System : PokeAPI
  @params : url=string
*/
export const getPokeCardDetail = (url) => {
    return {
      types: [
        FETCH_POKEMON_CARD_LOADING,
        FETCH_POKEMON_CARD_SUCCESS,
        FETCH_POKEMON_CARD_FAILURE
      ],
      promise: () => httpFetch(url, { headers })
    };
};


/*
  @Purpose : Clear Fetched Pokemons from Redux Store
  @System : Self
*/
export function clearPokemonCardDetail(nextOption) {
    return {
      type: FETCH_POKEMON_CARD_CLEAR,
      result: {}
    };
}
