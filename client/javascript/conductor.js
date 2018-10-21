'use strict';

import { WORKFLOW } from('./conductor-urls');
const workflow = require('./workflow');

let ConductorClient = class {
  constructor(origin) {
    //this._origin = origin;
    this.workflow = new WorkflowClient(origin);
    this.worker = new WorkerClient(origin);
    this.tasks = new TasksClient(origin);
  }
  workflow: () => {
      return {

      }
  }
};
let WorkflowClient = class {
    getWorkflow : (workflowId) => {
        //TODO
    }

}

function conductorClient(origin) {
    return new ConductorClient(origin);
}
