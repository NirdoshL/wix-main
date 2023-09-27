// const session = require("express-session");
// const RedisStore = require("connect-redis").default;
// const Client = require("../DataBase/cacheConnect");

// module.exports = session({
//   store: new RedisStore({ client: Client }),
//   secret: "mySecret",
//   saveUninitialized: false,
//   resave: false,
//   name: "sessionId",
//   cookie: {
//     secure: false, // if true: only transmit cookie over https, in prod, always activate this
//     httpOnly: true, // if true: prevents client side JS from reading the cookie
//     maxAge: 1000 * 60 * 30, // session max age in milliseconds
//     // explicitly set cookie to lax
//     // to make sure that all cookies accept it
//     // you should never use none anyway
//     sameSite: "lax",
//   },
// });
