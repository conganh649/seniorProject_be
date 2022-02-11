"use-strict";
const excelToJson = require("convert-excel-to-json");
var News = require("../models/newsModel");
const connectDB = require("../connection/connection");

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "news",
      header: { rows: 1 },
      columnToKey: {
        A: "title",
        B: "description",
        C: "image",
      },
    },
  ],
});

async function seedData() {
  await connectDB();
  await News.remove({});
  let i = 0;
  for (i = 0; i < result.news.length; i++) {
    const newNews = new News({
      title: result.news[i].title,
      description: result.news[i].description,
      image: result.news[i].image,
    });
    newNews.save(newNews);
    console.log(i + "-" + newNews.title + " saved");
  }
}
seedData();

module.exports = seedData;
