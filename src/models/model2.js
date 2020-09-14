export default async function createModel2({
  field1,
  field2,
} = {}) {
  return Object.freeze({
    field1,
    field2,
  });
}

