
/**
 * @type {import('../domain/index').ModelSpecification}
 */
const Accounts = {
  endpoint: 'accounts',
  modelName: 'Accounts',
  factory: dependencies => acctid => acctid
}