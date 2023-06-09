/**  @type {import('../domain/index').ModelSpecification}*/
export const AccountMembers = {
  modelName: 'accountMembers',
  endpoint: 'members',
  factory: deps => (acctId, userId) => ({ id: deps.uuid(), acctId, userId })
}
