'use strict';

//import { ORKFLOW } from('./conductor-urls');
const querystring = require('querystring');
const httpRequest = require('./http-request');

const Task = class{
    constructor(origin) {
        this.origin = origin;
    }
};

Task.prototype.get = (taskId) => {
   let url = `${this.origin}/task/${taskId}`;
   return httpRequest.get(url, { }); 
}

Task.prototype.queueAll = (verbose = false) => {
   let url = `${this.origin}/queue/all`;
   if (verbose === true) {
       url += '/verbose';
   }
   return httpRequest.get(url, { }); 
}

Task.prototype.queueSize = (...taskTypes) => {
   let url = `${this.origin}/queue/sizes`;
   let qs = taskTypes.map(ty => `taskType=${ty}`).join('&');
   url += '?' + qs;
   return httpRequest.get(url, { }); 
}

Task.prototype.poll = (taskType, workerId, domain) => {
   let url = `${this.origin}/tasks/poll/${taskType}?workerid=${workerId}&domain=${domain}`;
   return httpRequest.get(url, { }); 
}
Task.prototype.batchPollTasksByTaskType = (taskType, workerId, count, timeoutInMillisecond) => {
   let url = `${this.origin}/tasks/poll/batch/${taskType}`;
   return httpRequest.get(url, {
       workerid: workerId, 
       count: count, 
       timeout: timeoutInMillisecond 
   }); 
}

Task.prototype.update = (taskInstance) => {
   let url = `${this.origin}/tasks`;
   return httpRequest.post(url, { }, taskInstance); 
}

Task.prototype.ack = (taskId) => {
   let url = `${this.origin}/tasks/${taskId}/ack`;
   return httpRequest.post(url, { }, taskInstance); 
}
