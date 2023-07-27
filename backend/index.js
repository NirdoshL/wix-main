//imports
const ENV = require("dotenv");
ENV.config(); // env configuration
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const menuRoutes = require("./Routes/menu");
const { errorHandler } = require("./Config/errorHandler");
const { limitMethods } = require("./Utils/acceptedMethods");
const { corsOptionsDelegate } = require("./Utils/corsOrigin");

const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptionsDelegate));
app.use(limitMethods);

//db Connect
require("./DataBase/dbConnect");

//routes
app.use("/api/v1/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("We are Comming soon..........");
});

//running server
app.listen(PORT, () => {
  console.log(`☘️  Server running on http://localhost:${PORT}`);
});
//error Handler
app.use(errorHandler);
