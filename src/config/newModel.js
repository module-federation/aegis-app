export const Sales = {
  endpoint: "new-models",
  modelName: "NewModel",
  factory: function () {
    return async function ({ a, b }) {
      if (!a) throw new Error("a is required");
      return Object.freeze({ a, b });
    };
  },
};
