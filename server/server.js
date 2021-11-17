var express = require("express");
const connectDB = require("./connection/connection");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var cors = require("cors");
var users = require("./routes/router");
const dotenv = require("dotenv");
dotenv.config();

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
  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Server Running at ${port}`);
});

module.exports = app;
