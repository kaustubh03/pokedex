/*
  Get Generic Loading State for every State Case
*/

export const getLoadingState = (key, state) => {
  return {
    ...state[key],
    loading: true
  };
};

/*
  Get Generic Success State for every State Case
*/

export const getSuccessState = (key, state, payload) => {
  return {
    ...state[key],
    loading: false,
    data: payload.result,
    error: null
  };
};

/*
  Get Generic Error State for every State Case
*/

export const getErrorState = (key, state, payload) => {
  return {
    ...state[key],
    loading: false,
    error: payload.error
  };
};
