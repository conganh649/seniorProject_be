const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const fetch = require("node-fetch");

const createOne = async (req, res) => {
  let listManager = [];
  let listId = [];
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    // console.log(req.body);
    await User.find({ role: "Manager" }).then(async (data) => {
      data.map((manager, index) => {
        listManager.push(manager.fcm_token);
        listId.push(manager._id);
      });
      var notifications_body = {
        notification: {
          title: "New order",
          body: `${req.body.name} has just placed an order. Please check!`,
        },
        registration_ids: listManager,
      };
      await User.updateMany(
        {
          _id: { $in: listId },
        },
        {
          $push: {
            notification: {
              title: req.body.notification.title,
              body: req.body.notification.body,
            },
          },
          $set: {
            newNoti: true,
          },
        },
        { multi: true }
      );
      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization:
            "key=" +
            "AAAAzRXqY0k:APA91bF9EsvA7NBVY3JYNfQuVQx-twV9p16EcynLmXXSObOqGiQ1t4HmDEHnqUQcaE4aIlIFxq5EnIWm_GChPPnZp3XIy79DjqyU-Gpk8KLqIBLFHkyplGvNf8yZaIsny5Khl8QkjLDa",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications_body),
      });
    });

    let newOrder = new Order(req.body);
    const order = await newOrder.save();
    for (var i = 0; i < newOrder.orderDetail.length; i++) {
      let productId = newOrder.orderDetail[i].product.toString();
      let buyQuantity = newOrder.orderDetail[i].quantity.toString();
      await Product.find({ _id: productId }).then(async (data) => {
        data[0].quantity = (
          Number.parseInt(data[0].quantity) - Number.parseInt(buyQuantity)
        ).toString();
        let saveProduct = new Product(data[0]);
        await saveProduct.save();
      });
    }
    res.status(200).json({
      success: true,
      message:
        "Create order successfully and send notification to manager successfully",
      data: order,
    });
  } catch (err) {
    if (!err.status) {
      res.status(500).json({ success: false, message: err.message });
    } else {
      res
        .status(err.status)
        .json({ success: err.success, message: err.message });
    }
  }
};

const getOrder = async (req, res) => {
  if (req.query.id) {
    //Get order by id
    try {
      await Order.findById(req.query.id)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .json({ success: false, message: "Order not found" });
            return;
          } else {
            res.status(200).json({
              success: true,
              data: data,
            });
          }
        })
        .catch((err) => {
          res
            .status(err.status || 500)
            .json({ success: false, message: err.message });
        });
    } catch (err) {
      if (!err.status) {
        res.status(500).json({ success: false, message: err.message });
      } else {
        res
          .status(err.status)
          .json({ success: err.success, message: err.message });
      }
    }
  } else {
    //Get all
    try {
      await Order.find()
        .then((result) => {
          res.status(200).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(err.status || 500).json({
            success: false,
            message: err.message || "err occured while retrieving data",
          });
        });
    } catch (err) {
      if (!err.status) {
        res.status(500).json({ success: false, message: err.message });
      } else {
        res
          .status(err.status)
          .json({ success: err.success, message: err.message });
      }
    }
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    await Order.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "Order not found. Maybe id is wrong!" });
        return;
      } else {
        res
          .status(200)
          .json({ success: true, message: "User deleted successfully" });
      }
    });
  } catch (error) {
    if (!error.status) {
      res.status(500).send({ success: false, message: error.message });
    } else {
      res
        .status(error.status)
        .send({ success: error.success, message: error.message });
    }
  }
};

const updateOrder = async (req, res) => {
  let token = "";
  await Order.findById(req.params.id).then(async (data) => {
    await User.findById(data.user).then((user) => {
      token = user.fcm_token;
    });
  });
  console.log(req.body.status);
  await Order.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    returnOriginal: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("Cart not found");
      } else {
        var notifications_body = {
          notification: {
            title: `Your order is now ${req.body.status}`,
            body: "The neighborhood manager is working on your order.",
          },
          registration_ids: [token],
        };
        fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            Authorization:
              "key=" +
              "AAAAzRXqY0k:APA91bF9EsvA7NBVY3JYNfQuVQx-twV9p16EcynLmXXSObOqGiQ1t4HmDEHnqUQcaE4aIlIFxq5EnIWm_GChPPnZp3XIy79DjqyU-Gpk8KLqIBLFHkyplGvNf8yZaIsny5Khl8QkjLDa",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notifications_body),
        });
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createOne,
  getOrder,
  deleteOrder,
  updateOrder,
};
