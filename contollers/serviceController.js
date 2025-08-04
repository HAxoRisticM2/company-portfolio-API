const Service = require("../models/serviceModel");
const factory = require("../contollers/handlerFactory");

exports.getAllServices = factory.getAll(Service);

exports.createService = factory.createOne(Service);

exports.deleteService = factory.deleteOne(Service);

exports.updateService = factory.updateOne(Service);
