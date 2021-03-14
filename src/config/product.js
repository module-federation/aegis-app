/**
 * @type {import("../models").ModelSpecification}
 */
export const Product = {
  modelName: "Product",
  endpoint: "products",
  factory: () => ({ a, b }) => Object.freeze({ a, b }),
};
