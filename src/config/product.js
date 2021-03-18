/**
 * @type {import("../models").ModelSpecification}
 */
export const Product = {
  endpoint: "products",
  factory: () => ({ a, b }) => Object.freeze({ a, b }),
  modelName: "Product",
};
