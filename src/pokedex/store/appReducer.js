/*
  @Module : Pokedex
  @Component : Common
  @Type : Action Creator
  @Description : Common Action for Pokedex.
  @Author : Kaustubh Saxena
*/

const initialState = {
  name: null,
  tnc: null
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
