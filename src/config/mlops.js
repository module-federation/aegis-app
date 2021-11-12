'use strict'

const MLOps = {
  modelName: 'mlops',
  endpoint: 'ml-ops',
  ports: {
    mlDeployModel: {
      service: 'MLops',
      type: 'outbound',
      adapter: service => ({ model, args: [callback, trainingDataLoc] }) =>
        service
          .getDeploymentService('MLops')
          .startDeployment(callback, model, trainingDataLoc),
      consumesEvent: 'mlDeploymentRequested',
      producesEvent: 'mlDeploymentVerified',
      internal: true // no 3rd party comms, handled by appmesh
    },
    mlTrainModel: {
      service: 'MLops',
      type: 'outbound',
      consumesEvent: 'mlDeploymentVerified',
      producesEvent: 'mlModelConverged',
      adapter: service => ({ args: [callback, id] }) =>
        service.startTraining(id, callback),
      internal: true
    },
    mlReportLearning: {
      service: 'MLops',
      type: 'outbound',
      consumesEvent: 'mlModelConverged',
      producesEvent: 'mlReportLearning',
      adapter: service => ({ args: [callback, id] }) =>
        service.sendResults(id, callback),
      internal: true
    }
  }
}
