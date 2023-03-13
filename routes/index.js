const userRouter = require("./userRoutes");
const tweetRouter = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/users", userRouter);
  app.use("/tweets", tweetRouter);
};
