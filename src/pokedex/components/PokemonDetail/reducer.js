/*
  @Module : Pokedex
  @Component : Pokedex Search
  @Type : Reducer
  @Description : Reducer for Pokedex Home Screen
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
} from "../../constants/actionTypes";

// Utility Imports
import {
  getLoadingState,
  getSuccessState,
  getErrorState
} from "../../store/stateSettler";


const initialState = {
  pokemons: {
    loading: false,
    data: null,
    error: null
  },
  pokemonDetail: {
    loading: false,
    data: null,
    error: null
  }
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_POKEMON_DETAIL_LOADING: {
      return {
        ...state,
        pokemonDetail: getLoadingState("pokemonDetail", state)
      };
    }
    case FETCH_POKEMON_DETAIL_SUCCESS: {
      return {
        ...state,
        pokemonDetail: getSuccessState("pokemonDetail", state, action)
      };
    }
    case FETCH_POKEMON_DETAIL_FAILURE: {
      return {
        ...state,
        pokemonDetail: getErrorState("pokemonDetail", state, action)
      };
    }
    case FETCH_POKEMON_DETAIL_CLEAR: {
      return {
        ...state,
        pokemonDetail: initialState.pokemonDetail
      };
    }

    default:
      return state;
  }
}
