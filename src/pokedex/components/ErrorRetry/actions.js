import { DELETE_RETRY_UI } from '../../constants/actionTypes';
import httpFetch from '../../utils/http';

export function clearError(index) {
  return (dispatch, getState) => {
    const errorArr = getState().errorReducer.error;

    dispatch({
      type: DELETE_RETRY_UI,
      error: errorArr.slice(index, 1)
    });
  };
}

export function retryRequest(types, url, params) {
  return {
    types,
    promise: () => httpFetch(url, params)
  };
}
