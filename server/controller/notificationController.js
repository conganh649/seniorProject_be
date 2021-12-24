const express = require("express");
const fetch = require("node-fetch");
var User = require("../models/userModel");

exports.sendToAll = async (req, res) => {
  await User.updateMany(
    {},
    {
      $push: {
        notification: {
          title: req.body.title,
          body: req.body.body,
        },
      },
      $set: {
        newNoti: true,
      },
    },
    { multi: true }
  );
  var notifications_body = {
    to: "/topics/all",
    notification: req.body,
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
  })
    .then(() => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
      console.log(err);
    });
};

exports.sendToDevice = async (req, res) => {
  let listDeviceToken = [];
  await User.find()
    .where("_id")
    .in(req.body.listUser)
    .exec((err, records) => {
      records.map((record, index) => {
        listDeviceToken.push(record.fcm_token);
      });
    });
  await User.updateMany(
    {
      _id: { $in: req.body.listUser },
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
  await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAAzRXqY0k:APA91bF9EsvA7NBVY3JYNfQuVQx-twV9p16EcynLmXXSObOqGiQ1t4HmDEHnqUQcaE4aIlIFxq5EnIWm_GChPPnZp3XIy79DjqyU-Gpk8KLqIBLFHkyplGvNf8yZaIsny5Khl8QkjLDa",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      notification: req.body.notification,
      registration_ids: listDeviceToken,
    }),
  })
    .then(() => {
      res.status(200).send("Notification sent successfully");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
      console.log(err);
    });
};
