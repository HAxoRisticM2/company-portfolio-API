const TeamMember = require("../models/ourTeamModel");

exports.getAllMembers = async (req, res) => {
  const allMembers = await TeamMember.find();
  const totalMembers = allMembers.length;

  res.status(201).json({
    totalMembers,
    allMembers,
  });
};
exports.createMember = async (req, res) => {
  const member = new TeamMember(req.body);
  await member.save();
  res.status(201).json(member);
};

exports.updateMember = async (req, res) => {
  const updatedMember = await TeamMember.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedMember)
    return res.status(401).json("Cannot update please check your id");

  res.status(201).json("success");
};

exports.deleteMember = async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};
