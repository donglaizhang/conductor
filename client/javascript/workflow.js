'use strict';

//import { WORKFLOW } from('./conductor-urls');
//const querystring = require('querystring');
const httpRequest = require('./http-request');

const Workflow = class {};

Workflow.prototype.start = (name, version, correlationId, payload) => {
   let url = `/workflow/${name}`;
   let queryParamters = {
       version : version || 'latest',
       correlationId: correlationId
   }
   return httpRequest.post(url, queryParamters, payload); 
}

Workflow.prototype.getByWorkflowId = (workflowId, includeTask = false) => {
   let url = `/workflow/${workflowId}`;
   //let correlationId = (options || {}).correlationId || '';
   //let url = `${this.origin}/${name}?version=${version}&&correlationId=${correlationId}`
   //let reqPayload = payload || {};
   let queryParamters = {
       includeTask: includeTask
   }
   return httpRequest.get(url, queryParamters).catch(e => {
       return Promise.reject(e);
   }); 
}

Workflow.prototype.getRunningWorkflow = (name, correlationId, includeClosed, includeTasks) => {
   let url = `/workflow/running/${name}`;
   if (correlationId) {
       url = url + `/correlated/${correlationId}`;
   }
   let queryParamters = {
       includeClosed: includeClosed,
       includeTasks: includeTasks
   }
   return httpRequest.get(url, queryParamters); 
}

Workflow.prototype.pause = (workflowId) => {
    let url = `/workflow/${workflowId}/pause`;
    return httpRequest.put(url); 
}

Workflow.prototype.resume = (workflowId) => {
    let url = `/workflow/${workflowId}/resume`;
    return httpRequest.put(url); 
}

Workflow.prototype.rerun = (workflowId, reRunFromtaskId, workflowInput, taskInput) => {
    let url = `/workflow/${workflowId}/rerun`;
    return httpRequest.post(url, undefined, {
        reRunFromWorkflowId: `${workflowId}`,
        workflowInput: workflowInput || {},
        reRunFromTaskId: `${reRunFromtaskId}`,
        taskInput: taskInput || {}
    }); 
}

Workflow.prototype.restart = (workflowId) => {
    let url = `/workflow/${workflowId}/restart`;
    return httpRequest.post(url); 
}

Workflow.prototype.retry = (workflowId) => {
    let url = `/workflow/${workflowId}/retry`;
    return httpRequest.post(url); 
}
Workflow.prototype.skiptask = (workflowId, taskReferenceName, taskInput, taskOutput) => {
    let url = `/workflow/${workflowId}/skiptask/${taskReferenceName}`;
    let payload = {
        taskInput: taskInput,
        taskOutput: taskOutput
    }
    return httpRequest.put(url, undefined, payload); 
}
//elastic search based API
//TODO
Workflow.prototype.search = (name) => {}
