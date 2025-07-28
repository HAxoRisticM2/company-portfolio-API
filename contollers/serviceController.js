const Service = require("../models/serviceModel");

exports.getAllServices = async (req, res) => {
  const services = await Service.find();
  const totalServices = services.length;
  res.status(201).json({
    totalServices,
    services,
  });
};

exports.createService = async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.status(201).json(service);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};

exports.updateService = async (req, res) => {
  const updatedService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedService) return res.status(404).json("Servcice not found");

  res.status(201).json("success");
};
