export default function createModel2Factory() {
  return async function createModel2({
    field1,
    field2,
    sensitive,
  } = {}) {
    return Object.freeze({
      field1,
      field2,
      sensitive
    });
  }
}