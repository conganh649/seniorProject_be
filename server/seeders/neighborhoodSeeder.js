"use-strict";
const excelToJson = require("convert-excel-to-json");
var Neighborhood = require("../models/neighborhoodModel");
const connectDB = require("../connection/connection");

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "neighborhood",
      header: { rows: 1 },
      columnToKey: {
        A: "name",
        B: "ward",
        C: "district",
      },
    },
  ],
});

async function seedData() {
  await connectDB();
  await Neighborhood.remove({});
  let i = 0;
  for (i = 0; i < result.neighborhood.length; i++) {
    const newNeighborhood = new Neighborhood({
      name: result.neighborhood[i].name,
      ward: result.neighborhood[i].ward,
      district: result.neighborhood[i].district,
    });
    newNeighborhood.save(newNeighborhood);
    console.log(
      i +
        "-" +
        newNeighborhood.name +
        "-" +
        newNeighborhood.ward +
        "-" +
        newNeighborhood.district +
        " saved"
    );
  }
}
seedData();

module.exports = seedData;
