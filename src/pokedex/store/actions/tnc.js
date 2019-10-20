import {
  GV_TNC_LOADING,
  GV_TNC_SUCCESS,
  GV_TNC_FAILURE
} from '../../constants/actionTypes';

import httpFetch from '../../utils/http';

const headers = {
  'x-user-token': getAuthData().token,
  'x-user-mid': getAuthData().mid,
  'x-auth-ump': 'umpapp-3754-36d-aqr-cn7'
};

export function getTNC() {
  return {
    types: [GV_TNC_LOADING, GV_TNC_SUCCESS, GV_TNC_FAILURE],
    promise: () =>
      httpFetch(getApiUrl('getTncApi'), {
        headers
      })
  };
}
