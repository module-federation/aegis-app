export const DeploymentServiceLocator = {
  getDeploymentService (serviceName) {
    function start () {}
    return {
      startDeployment: start
    }
  }
}
