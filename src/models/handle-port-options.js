'use strict'

export default async function handlePortOptions({
  args: [callback],
  delegateCallback,
  resolve,
  reject,
  model
}, ...args) {
  if (callback && !delegateCallback) {
    try {
      await callback({
        model,
        resolve
      }, ...args);
    } catch (error) {
      reject(error);
      throw new Error(error);
    }
  } else {
    resolve(model);
  }
  return Promise.resolve(model);
}