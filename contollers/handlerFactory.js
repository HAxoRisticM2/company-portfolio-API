const { Model } = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();
    const total = docs.length;

    res.status(200).json({
      status: "success",
      results: total,
      data: {
        items: docs,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        item: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with this ID`, 404));
    }
    res.json({
      status: "success",
      data: {
        data: null,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDoc) {
      return next(new AppError(`No document found with this ID`, 404));
    }
    res.status(201).json({
      status: "success",
      data: {
        data: updatedDoc,
      },
    });
  });
