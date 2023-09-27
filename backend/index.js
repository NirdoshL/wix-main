//imports
const ENV = require("dotenv");
ENV.config(); // env configuration
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const users = require("./Routes/User");
const bodyParser = require("body-parser");
// const session = require("./Utils/session");
const cookieParser = require("cookie-parser");
const menuRoutes = require("./Routes/menu");
const pdfgenerator = require("./Routes/pdfgenerator");
const orderRoutes = require("./Routes/order");
const paymentRoutes = require("./Routes/stripe");
const { errorHandler } = require("./Config/errorHandler");
const { limitMethods } = require("./Utils/acceptedMethods");
const { corsOptionsDelegate } = require("./Utils/corsOrigin");

const PORT = process.env.PORT || 5000;

const app = express();

// app.set("view engine", "ejs");
// app.set("views", __dirname);

//middlewares
// app.use(bodyParser.json({ type: "application/json" }));
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session);
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use(morgan("dev"));
app.use(limitMethods);

//db Connect
require("./DataBase/cacheConnect");
require("./DataBase/dbConnect");
require("./DataBase/cacheConnect");

//routes
app.use("/users", users); //routes
app.use("/api/v1/menu", menuRoutes);
app.use("/stripe", paymentRoutes);
app.use("/order", orderRoutes);
app.use("/invoice", pdfgenerator);

app.get("/", (req, res) => {
  res.send("We are Comming soon..........");
});

//running server
app.listen(PORT, () => {
  console.log(`☘️  Server running on http://localhost:${PORT}`);
});
//error Handler
app.use(errorHandler);
