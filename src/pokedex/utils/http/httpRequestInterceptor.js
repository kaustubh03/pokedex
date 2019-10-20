import { getCookie } from '../../storage/cookie';
import * as R from 'ramda';

const getPostHeaders = headers => {
  if (!headers) {
    headers = {};
  }

  headers['Content-Type'] = 'application/json';
  headers['Cache-Control'] = 'no-cache';
 
  const xxsrfToken = getCookie && getCookie('XSRF-TOKEN');
  let withXsrf = {};
  if (xxsrfToken) {
    withXsrf = {
      'X-XSRF-TOKEN': xxsrfToken,
      'X-CSRF-TOKEN': xxsrfToken,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-cache'
    };
  }
  return { headers: Object.assign(headers, withXsrf) };
};

const checkRequest = (url, options) => {
  const modifiedUrl = url;

  let params = R.clone(options);
  const headers = getPostHeaders(params && params.headers);

  const safeStringify = R.ifElse(R.is(Object), R.toString, R.identity);
  params.body = safeStringify(params.body);
  params.timeout = 5000; //set timeout
  params = { ...headers, ...params };

  return {
    url: modifiedUrl,
    params: params
  };
};

export default checkRequest;
