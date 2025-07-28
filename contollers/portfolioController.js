const PortfolioProject = require("../models/portfolioModel");

exports.getAllProjects = async (req, res) => {
  const projects = await PortfolioProject.find();
  const totalProjects = projects.length;
  res.status(201).json({
    totalProjects,
    projects,
  });
};
exports.getProjectOnCategory = async (req, res) => {
  const category = req.params.category;
  const project = await PortfolioProject.find({ category });

  res.json(project);
};

exports.createProject = async (req, res) => {
  const project = new PortfolioProject(req.body);
  await project.save();
  res.status(201).json(project);
};
exports.deleteProject = async (req, res) => {
  await PortfolioProject.findByIdAndDelete(req.params.id);
  res.json("Deleted project");
};

exports.updateProject = async (req, res) => {
  const updatedPortfolio = await PortfolioProject.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedPortfolio) return res.json("cannot update the portfolio", 404);

  res.status(201).json("success");
};
