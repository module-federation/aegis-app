/**
 * @type {import("../models").ModelSpecification}
 */
export const Product = {
  endpoint: "products",
  factory: () => ({ a, b }) =>
    Object.freeze({ a, b, hi: () => console.log("hi") }),
  modelName: "product",
  commands: {
    hi: {
      command: "hi",
      acl: ["write"],
    },
  },
};
