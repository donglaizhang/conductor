// const http = require('http');
const rp = require('request-promise-native');
const querystring = require('querystring');

/*
 * totally 3 types of apis:
 * refer: https://netflix.github.io/conductor/runtime/
 * 1. meta
 * 2. workflow
 * 3. tasks
 *
 * */

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

module.exports = class HttpClient {
  constructor(origin) {
    this.origin = origin;
  }

  _request(url, method, queryParams, payload) {
    let uri = this.origin + (url ? (url[0] !== '/' ? '/' : '') + `${url}` : '');

    const qs = querystring.stringify(queryParams);
    uri += (qs ? `?${qs}` : '');
    const options = {
      uri,
      method,
      body: payload,
      json: true,
      headers,
      resolveWithFullResponse: true
    };

    return rp(options).catch((e) => {
      handleError(`Unable to invoke Conductor API with uri: ${uri}, caused by:`, e);
      return Promise.reject(e);
    });
  }

  post(url, queryParams, payload) {
    return this._request(url, 'POST', queryParams, payload);
  } 

  put(url, queryParams, payload) {
    return this._request(url, 'put', queryParams, payload);
  } 

  get(url, queryParams) {
    return this._request(url, 'GET', queryParams);
  }
};

function handleError(message, error) {
  return message + error;
}
