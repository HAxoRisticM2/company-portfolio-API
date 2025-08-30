const { Model } = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIfeatures");

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // 1. Create a base query
    let filter = {};
    // This allows for nested GET reviews on a product (e.g., /products/123/reviews)
    // If needed, you can pass a filter object from a parent route
    if (req.params.productId) filter = { product: req.params.productId };

    let query = Model.find(filter);

    // 2. Optional Population (e.g., populate 'user' field)
    if (popOptions) query = query.populate(popOptions);

    // 3. Execute the query using APIFeatures (Filter, Sort, LimitFields, Paginate)
    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    // const docs = await features.query.explain(); // for debugging indexes
    const docs = await features.query;

    // 4. Get the TOTAL number of documents for the given FILTER (before pagination)
    // This is crucial for pagination metadata
    const total = await Model.countDocuments(features.query.getFilter());

    // 5. Send Response
    res.status(200).json({
      status: "success",
      results: docs.length,
      total: total, // Total documents matching the filter
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
