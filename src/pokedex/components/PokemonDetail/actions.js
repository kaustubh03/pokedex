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
  FETCH_POKEMON_DETAIL_LOADING,
  FETCH_POKEMON_DETAIL_SUCCESS,
  FETCH_POKEMON_DETAIL_FAILURE,
  FETCH_POKEMON_DETAIL_CLEAR
} from '../../constants/actionTypes';

/*
  Fetch Wrapper used to hit API.
*/
import httpFetch from '../../utils/http';
/*
  Utility Imports
*/


let headers = {
  'Cache-Control': 'no-cache',
  'Accept':'application/json'
};

/*
  @Purpose : Get Selected Pokemon Details
  @System : PokeAPI
  @params : url=string
*/
export const getPokemonDetails = (url) => {
    return {
      types: [
        FETCH_POKEMON_DETAIL_LOADING,
        FETCH_POKEMON_DETAIL_SUCCESS,
        FETCH_POKEMON_DETAIL_FAILURE
      ],
      promise: () => httpFetch(url, { headers })
    };
};


/*
  @Purpose : Clear Fetched Pokemons from Redux Store
  @System : Self
*/
export function clearPokemonDetail(nextOption) {
    return {
        type: FETCH_POKEMON_DETAIL_CLEAR,
        result: {}
    };
}
