const express = require("express");
const route = express.Router();
const fetch = require("node-fetch");

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const productController = require("../controller/productController");
const orderController = require("../controller/orderController");
const familyController = require("../controller/familyController");
const notificationController = require("../controller/notificationController");
const verifyToken = require("../middleware/auth");

// API

// USERS
route.post("/api/users", verifyToken, userController.create);
route.get("/api/users", verifyToken, userController.find);
route.put("/api/users/:id", verifyToken, userController.update);
route.delete("/api/users/:id", verifyToken, userController.delete);
route.put("/api/users/pass/:id", verifyToken, userController.change);
route.get("/api/users/military", verifyToken, userController.militaryService);

// PRODUCTS
route.get("/api/products", verifyToken, productController.getAll);
route.post("/api/products", verifyToken, productController.create);
route.get("/api/products/:id", verifyToken, productController.getOne);
route.put("/api/products/:id", verifyToken, productController.update);
route.delete("/api/products/:id", verifyToken, productController.delete);

//AUTH
route.post("/api/signup", authController.signup);
route.post("/api/signin", authController.signin);

// ORDERS
route.post("/api/orders", verifyToken, orderController.createOne);
route.get("/api/orders", verifyToken, orderController.getOrder);
route.delete("/api/orders/:id", verifyToken, orderController.deleteOrder);
route.put("/api/orders/:id", verifyToken, orderController.updateOrder);

// FAMILIES
route.get("/api/family", verifyToken, familyController.getFamily);
route.post("/api/family", verifyToken, familyController.createOne);
route.put("/api/family/:id", verifyToken, familyController.updateFamily);
route.delete("/api/family/:id", verifyToken, familyController.deleteFamily);
route.post(
  "/api/family/cultural",
  verifyToken,
  familyController.getCulturalFamily
);

// NOTIFICATIONS
route.post(
  "/api/notification/sendToAll",
  verifyToken,
  notificationController.sendToAll
);

route.post(
  "/api/notification/sendToDevice",
  verifyToken,
  notificationController.sendToDevice
);
module.exports = route;
