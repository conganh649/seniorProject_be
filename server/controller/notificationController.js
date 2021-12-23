const express = require("express");
const fetch = require("node-fetch");

exports.sendToAll = async (req, res) => {
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
  var notifications_body = {
    notification: req.body,
    registration_ids: req.body,
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
