const express = require("express");
const app = express();
const constant = require("./constants/constant");
const cors = require("cors");
const cron = require("node-cron");

const bodyParser = require("body-parser");

const { connectDB } = require("./config/database");

const { Cron } = require("./Utils/Cron");

require("dotenv").config();

connectDB();
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
  "/authenticated",
  require("./middleware/authToken"),
  require("./routes/authenticated")
);
app.use("/unauthenticated", require("./routes/unauthenticated"));

cron.schedule("0 18 * * 1-5", () => {
  Cron("dinner", constant.dinner); // Run at 6-PM
});

cron.schedule("0 10 * * 1-5", () => {
  Cron("lunch", constant.lunch); // Run at 10-AM
});

app.listen(process.env.PORT, () => console.log("server Started"));
