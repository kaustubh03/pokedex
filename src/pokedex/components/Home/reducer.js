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
  FETCH_ALL_POKEMONS_LOADING,
  FETCH_ALL_POKEMONS_SUCCESS,
  FETCH_ALL_POKEMONS_FAILURE,
  FETCH_ALL_POKEMONS_CLEAR,
  FETCH_POKEMON_CARD_LOADING,
  FETCH_POKEMON_CARD_SUCCESS,
  FETCH_POKEMON_CARD_FAILURE,
  FETCH_POKEMON_CARD_CLEAR
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
  pokeCard: {
    loading: false,
    data: null,
    error: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_POKEMONS_LOADING: {
      return {
        ...state,
        pokemons: getLoadingState("pokemons", state)
      };
    }
    case FETCH_ALL_POKEMONS_SUCCESS: {
      return {
        ...state,
        pokemons: getSuccessState("pokemons", state, action)
      };
    }
    case FETCH_ALL_POKEMONS_FAILURE: {
      return {
        ...state,
        pokemons: getErrorState("pokemons", state, action)
      };
    }
    case FETCH_ALL_POKEMONS_CLEAR: {
      return {
        ...state,
        pokemons: initialState.pokemons
      };
    }
    case FETCH_POKEMON_CARD_LOADING: {
      return {
        ...state,
        pokeCard: getLoadingState("pokeCard", state)
      };
    }
    case FETCH_POKEMON_CARD_SUCCESS: {
      return {
        ...state,
        pokeCard: getSuccessState("pokeCard", state, action)
      };
    }
    case FETCH_POKEMON_CARD_FAILURE: {
      return {
        ...state,
        pokeCard: getErrorState("pokeCard", state, action)
      };
    }
    case FETCH_POKEMON_CARD_CLEAR: {
      return {
        ...state,
        pokeCard: initialState.pokeCard
      };
    }

    default:
      return state;
  }
}
