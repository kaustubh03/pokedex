import fetch from 'node-fetch';
import checkResponse from './httpResponseInterceptor';
import checkRequest from './httpRequestInterceptor';
import constants from '../../constants/appconstants';


const timer = 30000;

export const httpFetch = (url, opts = {}, handle500) => {
  let requestObj = checkRequest(url, opts);

  return new Promise(function(resolve, reject) {
    const timeout = setTimeout(function() {
      reject(new Error(constants.REQUEST_TIME_OUT));
    }, timer);
    let request = null;
    if (!window.navigator.onLine) {
      request = {
        msg: constants.NO_NETWORK,
        url: requestObj.url,
        params: requestObj.params
      };
      reject(request);
    } else {
      fetch(requestObj.url, requestObj.params)
        .then(response => {
          return response;
        })
        .then(checkResponse)
        .then(r => {
          clearTimeout(timeout);
          return resolve(r.json());
        })
        .catch(e => {
          clearTimeout(timeout);
          console.log('Not able to fetch response for ', url, e);
          if (!handle500) {
            console.log('Oops, something went wrong! Please try again.');
          }
          if (e.toString() === 'TypeError: Failed to fetch') {
            reject(request);
          } else {
            reject(e);
          }
        });
    }
  });
};

export default httpFetch;
