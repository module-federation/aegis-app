/**
 * @type {import("../models").ModelSpecification}
 */
export const Sales = {
  modelName: "Sales",
  endpoint: "sales",
  factory: () => ({ a, b }) => Object.freeze({ a, b }),
};
