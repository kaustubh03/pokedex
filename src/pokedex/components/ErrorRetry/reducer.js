import { SHOW_RETRY_UI, DELETE_RETRY_UI } from '../../constants/actionTypes';

const initialState = {
  error: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_RETRY_UI:
      const newError = [...state.error];
      newError.push(action.error);
      return {
        ...state,
        error: newError
      };
    case DELETE_RETRY_UI:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
