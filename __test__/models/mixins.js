import { parseKeys } from "../../src/models/mixins";

describe("parseKeys", function () {
  console.log(parseKeys({ email: "fake" }, /email/i));
});

