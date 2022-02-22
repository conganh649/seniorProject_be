const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
