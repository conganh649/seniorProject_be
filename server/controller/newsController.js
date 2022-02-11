const News = require("../models/newsModel");

const createOne = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    let newNews = new News(req.body);
    const news = await newNews.save();
    res.status(200).json({
      success: true,
      message: "Create news successfully",
      data: news,
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

const getNews = async (req, res) => {
  if (req.query.id) {
    //Get order by id
    try {
      await News.findById(req.query.id)
        .then((data) => {
          if (!data) {
            res.status(404).json({ success: false, message: "News not found" });
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
      await News.find()
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

const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    await News.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res.status(404).json({ message: "News not found. Maybe id is wrong!" });
        return;
      } else {
        res
          .status(200)
          .json({ success: true, message: "News deleted successfully" });
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

const updateNews = async (req, res) => {
  await News.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    returnOriginal: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("News not found");
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createOne,
  getNews,
  deleteNews,
  updateNews,
};
