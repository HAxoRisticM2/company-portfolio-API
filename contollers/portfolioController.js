const Portfolio = require("../models/portfolioModel");
const factory = require("../contollers/handlerFactory");

exports.getAllProjects = factory.getAll(Portfolio);
exports.createProject = factory.createOne(Portfolio);
exports.deleteProject = factory.deleteOne(Portfolio);
exports.updateProject = factory.updateOne(Portfolio);

exports.getProjectOnCategory = async (req, res) => {
  const category = req.params.category;
  const project = await PortfolioProject.find({ category });

  res.json(project);
};
