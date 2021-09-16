var express = require("express");
const connectDB = require("./connection/connection");
const bodyParser = require("body-parser");
var cors = require("cors");

var users = require("./routes/router");

const dotenv = require("dotenv");
dotenv.config();
//routes
const cartRoutes = require("./routes/api/cart");

const labelRoutes = require("./routes/api/label");
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
console.log("Enable CORS");

app.use("/", users);
connectDB();

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
// cart route
app.use("/api", cartRoutes);

app.use("/api", labelRoutes);
module.exports = app;
