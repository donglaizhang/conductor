'use strict';

const httpClient = require('./http-client');
const http = require('http');

let localHttpClient = httpClient('localhost', 8000);
localHttpClient.get('/').then(rs => {
    console.log('get response:', rs);
})
//http.get('http://localhost:8000/', (res) => {
//    console.log('in callback');
//}) 
