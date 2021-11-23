const express = require("express");
const route = express.Router();

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
// const cartController = require("../controller/cartController");
// const labelController = require("../controller/labelController");
// const categoryController = require("../controller/categoryController");

const verifyToken = require("../middleware/auth");

// API

// USERS
route.post("/api/users", verifyToken, userController.create);
route.get("/api/users", verifyToken, userController.find);
route.put("/api/users/:id", verifyToken, userController.update);
route.delete("/api/users/:id", verifyToken, userController.delete);
route.put("/api/users/pass/:id", verifyToken, userController.change);

// PRODUCTS
route.get("/api/products", verifyToken, productController.getAll);
route.post("/api/products", verifyToken, productController.create);
route.get("/api/products/:id", verifyToken, productController.getOne);
route.put("/api/products/:id", verifyToken, productController.update);
route.delete("/api/products/:id", verifyToken, productController.delete);

//AUTH
route.post("/api/signup", authController.signup);
route.post("/api/signin", authController.signin);
// // CARTS
// route.post("/api/carts", verifyToken, cartController.createCart);
// route.get("/api/carts", verifyToken, cartController.getCartItem);
// route.delete("/api/carts/:id", verifyToken, cartController.deleteCartItem);
// route.put("/api/carts/:id", verifyToken, cartController.updateCartItem);
// route.get("/api/carts/:id", verifyToken, cartController.getCartItemById);

// //LABELS
// route.post("/api/labels", verifyToken, labelController.createLabel);
// route.get("/api/labels", labelController.getLabel);
// route.get("/api/labels/:id", labelController.getLabelById);
// route.put("/api/labels/:id", verifyToken, labelController.updateLabel);
// route.delete("/api/labels/:id", verifyToken, labelController.deleteLabel);

// //CATEGORIES
// route.post("/api/categories", verifyToken, categoryController.createCategory);
// route.get("/api/categories", categoryController.getCategory);
// route.get("/api/categories/:id", categoryController.getCategoryById);
// route.put(
//   "/api/categories/:id",
//   verifyToken,
//   categoryController.updateCategory
// );
// route.delete(
//   "/api/categories/:id",
//   verifyToken,
//   categoryController.deleteCategory
// );
module.exports = route;
