export default function createModel2Factory() {
  return async function createModel2({
    field1,
    field2,
    field3
  } = {}) {
    return Object.freeze({
      field1,
      field2,
      field3
    });
  }
}