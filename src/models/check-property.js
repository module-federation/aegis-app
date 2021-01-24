export default async function checkProperty(
  key,
  options = {},
  payload = {},
  func = checkProperty.name
) {
  const { model } = options;

  if (!model || !payload || !key) {
    const error = "payload, key or model is missing";
    console.error({ func, error, payload, key, model });
    return {};
  }

  if (Array.isArray(key)) {
    const keys = await Promise.all(
      key.map((k) => checkProperty(k, options, payload, func))
    );
    return keys;
  }

  if (payload[key]) {
    return { [key]: payload[key] };
  }

  if (model[key]) {
    return { [key]: model[key] };
  }

  const latest = await model.find();
  if (latest?.[key]) {
    return { [key]: latest[key] };
  }

  const error = "property is missing " + key;
  console.error({ func, error, payload, model, latest });
  throw new Error(error);
}
