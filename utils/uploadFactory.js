const fs = require("fs");
const path = require("path");

exports.deleteOldImage = (fieldName) => {
  return async (req, res, next) => {
    try {
      const Model = require(`../models/${req.baseUrl.split("/")[1]}Model`);
      const doc = await Model.findById(req.params.id);
      if (!doc) return next();

      const oldImage = doc[fieldName];
      if (oldImage) {
        const oldPath = path.join(
          __dirname,
          "..",
          "public",
          "uploads",
          oldImage
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    } catch (err) {
      console.error("Error deleting old image:", err);
    }
    next();
  };
};

exports.handleImageUpload = (fieldName, defaultImage = "default.jpg") => {
  return (req, res, next) => {
    if (req.file) {
      req.body[fieldName] = req.file.filename;
    } else {
      // If no file uploaded and field is missing, assign default image
      req.body[fieldName] = defaultImage;
    }
    next();
  };
};
