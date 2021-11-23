"use-strict";
const excelToJson = require("convert-excel-to-json");
var User = require("../models/userModel");
const connectDB = require("../connection/connection");

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "users",
      header: { rows: 1 },
      columnToKey: {
        A: "idCard",
        B: "fullName",
        C: "phoneNumber",
        D: "email",
        E: "password",
        F: "gender",
        G: "address",
        H: "dateofbirth",
        I: "role",
      },
    },
  ],
});

async function seedData() {
  await connectDB();
  await User.remove({});
  let i = 0;
  for (i = 0; i < result.users.length; i++) {
    const newUser = new User({
      idCard: result.users[i].idCard,
      fullName: result.users[i].fullName,
      phoneNumber: result.users[i].phoneNumber,
      email: result.users[i].email,
      password: result.users[i].password,
      gender: result.users[i].gender,
      address: result.users[i].address,
      dateofbirth: result.users[i].dateofbirth,
      role: result.users[i].role,
    });
    newUser.save(newUser);
    console.log(i + "-" + newUser.idCard + " saved");
  }
}
seedData();

module.exports = seedData;
