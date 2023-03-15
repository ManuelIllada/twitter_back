const public = require("./public");
const private = require("./private");

module.exports = (app) => {
  app.use("/", public);
  app.use("/", private);
};
