import { factorial } from "./factorial.wasm";

export { factorial };

export function factorialJavascript(i) {
  if (i < 1) return 1;
  return i * factorialJavascript(i - 1);
}
