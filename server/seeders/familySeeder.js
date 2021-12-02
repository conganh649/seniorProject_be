"use-strict";
const excelToJson = require("convert-excel-to-json");
const connectDB = require("../connection/connection");
const async = require("async");
const _ = require("lodash");
const dotenv = require("dotenv");
dotenv.config();

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var Neighborhood = require("../models/neighborhoodModel");
var User = require("../models/userModel");
var Family = require("../models/familyModel");

async function connect() {
  await connectDB();
}

let referenceData = null;

new Promise((resolve) => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    promiseLibrary: require("bluebird"),
  });
  async.parallel(
    [
      (callback) => {
        User.find({}).exec((err, user_ids) => {
          callback(null, user_ids);
        });
      },
      (callback) => {
        Neighborhood.find({}).exec((err, neighborhood_ids) => {
          callback(null, neighborhood_ids);
        });
      },
    ],
    (err, results) => {
      resolve(results);
      mongoose.connection.close();
    }
  );
}).then((results) => {
  referenceData = results;
  seedData();
});

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "family",
      header: { rows: 1 },
      columnToKey: {
        A: "familyName",
        B: "familyOwnerId",
      },
    },
  ],
});

async function seedData() {
  await connect();
  await Family.remove({});
  let i = 0;
  let j = 0;
  for (i = 0; i < result.family.length; i++) {
    let rand = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    let members = [];

    for (j = 0; j < rand; j++) {
      members.push({
        memberId: _.sample(referenceData[0])._id.toString(),
        memberName: _.sample(referenceData[0]).fullName.toString(),
      });
    }

    const newFamily = new Family({
      familyName: result.family[i].familyName,
      familyOwnerId: result.family[i].familyOwnerId,
      members: members,
      neighborhood: _.sample(referenceData[1])._id.toString(),
    });
    newFamily.save(newFamily);
    console.log(i + "-" + newFamily.familyName + " saved");
  }
}
