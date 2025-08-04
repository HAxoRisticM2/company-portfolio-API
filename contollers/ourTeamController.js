const TeamMember = require("../models/ourTeamModel");
const factory = require("../contollers/handlerFactory");

exports.getAllMembers = factory.getAll(TeamMember);
exports.createMember = factory.createOne(TeamMember);
exports.updateMember = factory.updateOne(TeamMember);
exports.deleteMember = factory.deleteOne(TeamMember);
