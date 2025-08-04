const User = require("../models/userModel");
const factory = require("../contollers/handlerFactory");

exports.getAllUsers = factory.getAll(User);
exports.createOne = factory.createOne(User);
exports.deleteOne = factory.deleteOne(User);
exports.UpdateOne = factory.updateOne(User);
