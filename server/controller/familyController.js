const Family = require("../models/familyModel");

const createOne = async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      res.status(400).send({ message: "Content can not be empty" });
      return;
    }
    let newFamily = new Family(req.body);
    const family = await newFamily.save();
    res.status(200).json({
      success: true,
      message: "Create family successfully",
      data: family,
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

const getFamily = async (req, res) => {
  if (req.query.id) {
    //Get order by id
    try {
      await Family.findById(req.query.id)
        .then((data) => {
          if (!data) {
            res
              .status(404)
              .json({ success: false, message: "Family not found" });
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
      await Family.find()
        .then((result) => {
          res.status(200).json({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(err.status || 500).json({
            success: false,
            message: err.message || "err occurred while retrieving data",
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

const deleteFamily = async (req, res) => {
  try {
    const id = req.params.id;
    await Family.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ message: "Family not found. Maybe id is wrong!" });
        return;
      } else {
        res
          .status(200)
          .json({ success: true, message: "Family deleted successfully" });
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

const updateFamily = async (req, res) => {
  await Family.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    returnOriginal: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send("Family not found");
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getCulturalFamily = async (req, res) => {
  let year = req.body.year;
  console.log(year);
  try {
    await Family.find({
      culturalFamilyRating: {
        $elemMatch: {
          year: year.toString(),
          rating: { $gte: Number.parseInt(90) },
        },
      },
    })
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        res.status(err.status || 500).json({
          success: false,
          message: err.message || "err occurred while retrieving data",
        });
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

module.exports = {
  createOne,
  getFamily,
  deleteFamily,
  updateFamily,
  getCulturalFamily,
};
