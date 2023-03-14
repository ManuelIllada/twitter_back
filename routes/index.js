const authenticationRouter = require("./authentication");
const userRouter = require("./userRoutes");
const tweetRouter = require("./tweetRoutes");
const { expressjwt: checkJwt } = require("express-jwt");

module.exports = (app) => {
  app.use("/", authenticationRouter);
  app.use("/users", checkJwt(process.env.SESSION_SECRET, { algorithms: ["HS256"] }), userRouter);
  app.use("/tweets", checkJwt(process.env.SESSION_SECRET, { algorithms: ["HS256"] }), tweetRouter);
};
