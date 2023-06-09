'use strict'

export default function controlAsync(generatorFunc) {
  return function () {
    const generator = generatorFunc.apply(this, arguments);

    function handle(result) {
      if (result.done) return result.value;
      return result.value.then(r => handle(generator.next(r)));
    }

    handle(generator.next());
  }
}                                                                                                                                                                           