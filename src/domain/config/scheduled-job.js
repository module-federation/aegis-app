'use strict'

/**
 * @type {import('./index').ModelSpecification}
 */
export const ScheduledJob = {
  modelName: 'scheduledjob',
  endpoint: 'scheduledjobs',
  factory: dependencies => ({
    startTime,
    startEvent,
    desc,
    expectedDur,
    assingee
  }) =>
    Object.freeze({
      startEvent,
      startTime,
      desc,
      expectedDur,
      assingee,
      jobId: dependencies.uuid()
    }),
  ports: {
    startJob: {}
  }
}
