'use strict';

const http = require('http');

/*
 * totally 3 types of apis:
 * refer: https://netflix.github.io/conductor/runtime/
 * 1. meta
 * 2. workflow
 * 3. tasks
 *
 * */
function HttpRequestClient (endpoint) {
    constrcutor

}

function _request(options, reqbody, callback) {
    let requestOptions = Object.assign({timeout: 1000 * 10}, options, {headers: headers});
    let req = http.request(requestOptions, callback);
    if(reqbody) {
        req.write(reqbody);
    }
    req.end();
}

//TODO more work need to handle http response
function promiseRequest(options, reqbody) {
    return new Promise(function(resolve, reject){
      _request(options, reqbody, (res) => {
        res.setEncoding('utf8');
        res.on("data", function (data) {
            responseString += data;
            // save all the data from response
        });
        res.on("end", function () {
            console.log(responseString); 
            // print to console when response ends
        });
      });
    });
}

function post (path, payload) {
    let options = {
        path: path,
        method: 'POST',
    }
}


headers = {
    'Content-Type': 'application/json', 
    'Accept': 'application/json'
}
HttpRequestClient.prototype.request = (options) => {

}
HttpRequestClient.prototype.del = () => {
}

HttpRequestClient.prototype.put = () => {
}

HttpRequestClient.prototype.get = () => {
}

HttpRequestClient.prototype.post = () => {
}

let httpClient = new HttpRequestClient();
modules.exports = httpClient;
