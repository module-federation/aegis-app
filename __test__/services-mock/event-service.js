
const { handleEvents } = require("../../src/services-mock/event-service");

const res = {
  send(msg) {
    console.log(msg);
  },
};
handleEvents("inventory message", res);
