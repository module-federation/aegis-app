"use strict";

/**
 * Check the payload for expected properties.
 * @param {string|string[]} key name of property or properties
 * @param {*} options
 * @param {*} payload
 * @param {*} port
 */
export default function checkPayload(
  key,
  options = {},
  payload = {},
  port = checkPayload.name
) {
  const { model } = options;

  if (!model || Object.keys(payload) < 1 || !key) {
    throw new Error({
      desc: "model, payload, or key is missing",
      model,
      port,
      error,
      payload,
      key,
    });
  }

  if (Array.isArray(key)) {
    const keys = key.map(k => checkPayload(k, options, payload, port));

    return keys.reduce((p, c) => ({ ...p, ...c }));
  }

  if (payload[key]) {
    return { [key]: payload[key] };
  }

  if (model[key]) {
    return { [key]: model[key] };
  }

  return model
    .find()
    .then(latest => ({ [key]: latest[key] }))
    .catch(error => {
      throw new Error({
        desc: "property is missing" + key,
        port,
        error,
        payload,
        model,
      });
    });
}
