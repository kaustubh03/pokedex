/* 
  Since Using Fetch Wrapper we Need to 
  provide handlers for 4xx Status Codes as they are 
  returned inside then callback and destruct store structure

*/
import constants from '../constants/appconstants';
import { SHOW_RETRY_UI } from '../constants/actionTypes';

const otherErrors = [400];

export function augmentorMiddleware() {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise();

      actionPromise
        .then(result => {
          if (
            result &&
            result.statusCode &&
            otherErrors.includes(result.statusCode)
          ) {
            next({ ...rest, result, type: FAILURE });
          } else {
            next({ ...rest, result, type: SUCCESS });
          }
          // error => next({ ...rest, error, type: FAILURE })
        })
        .catch(error => {
          console.error('MIDDLEWARE ERROR:', error);
          if (error && error.msg && error.msg === constants.NO_NETWORK) {
            const errCpy = error;
            errCpy.types = [REQUEST, SUCCESS, FAILURE];
            next({ ...rest, error: errCpy, type: SHOW_RETRY_UI });
          } else {
            next({ ...rest, error, type: FAILURE });
          }
        });

      return actionPromise;
    };
  };
}
