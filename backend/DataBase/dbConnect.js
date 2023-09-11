const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => {
    console.log(`☘️  DataBase connection Successful`);
  })
  .catch((err) => console.log(`🍁  Error in dataBase due to ${err}`));
