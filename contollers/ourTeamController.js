const TeamMember = require("../models/ourTeamModel");
const factory = require("../contollers/handlerFactory");

exports.createMember = factory.createOne(TeamMember);
exports.updateMember = factory.updateOne(TeamMember);
exports.getAllMembers = factory.getAll(TeamMember);
exports.deleteMember = factory.deleteOne(TeamMember);
