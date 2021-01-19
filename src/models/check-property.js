async function checkProperty(
  key,
  options = {},
  payload = {},
  func = checkProperty.name
) {
  const { model } = options;

  if (!model || !payload || !key) {
    console.error({
      func,
      error: "model, payload, or key is missing",
    });
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

  console.error({
    func,
    error,
    payload,
    model,
    latest,
  });

  //throw new Error(error);
}

var model = { update: (o) => o, find: (k) => ({ [k]: "v" }) };
var options = { model };
var requiredProp = "a";
var requiredProp2 = "b";
var payload = { requiredProp };
var payload2 = { requiredProp, requiredProp2 };

(async () => {
  const result1 = await checkProperty(requiredProp, options, payload);
  console.log({ result1 });

  const result2 = await checkProperty("requiredProp", options);
  console.log({ result2 });

  const result3 = await checkProperty(
    ["requiredProp", "requiredProp2"],
    options,
    payload2
  );
  console.log({ result3: result3.reduce((p, c) => ({ ...c, ...p })) });
})();

// checkProperty(
//   ["requiredProp", "requiredProp2"],
//   options,
//   payload2
// ).then((result) => console.log(result.reduce((c, p) => ({ ...p, ...c }))));
