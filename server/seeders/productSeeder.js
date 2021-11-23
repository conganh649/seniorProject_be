"use-strict";
const excelToJson = require("convert-excel-to-json");
var Product = require("../models/productModel");
const connectDB = require("../connection/connection");

const result = excelToJson({
  sourceFile: __dirname + "/data.xlsx",
  sheets: [
    {
      name: "products",
      header: { rows: 1 },
      columnToKey: {
        A: "productName",
        B: "productThumbnail",
        C: "description",
        D: "price",
        E: "status",
        F: "quantity",
        G: "category",
      },
    },
  ],
});

async function seedData() {
  await connectDB();
  await Product.remove({});
  let i = 0;
  for (i = 0; i < result.products.length; i++) {
    const newProduct = new Product({
      productName: result.products[i].productName,
      productThumbnail: result.products[i].productThumbnail,
      description: result.products[i].description,
      price: result.products[i].price,
      status: result.products[i].status,
      quantity: result.products[i].quantity,
      category: result.products[i].category,
    });
    newProduct.save(newProduct);
    console.log(i + "-" + newProduct.productName + " saved");
  }
}
seedData();

module.exports = seedData;
