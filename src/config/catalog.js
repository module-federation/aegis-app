/**
 * @type {import("../models/index").ModelSpecification}
 */
export const Catalog = {
  modelName: "catalog",
  endpoint: "catalogs",
  factory: function (y) {
    return { x: y };
  },
};
