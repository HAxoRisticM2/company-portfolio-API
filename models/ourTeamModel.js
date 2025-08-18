const mongoose = require("mongoose");
const { deleteOldImageHook } = require("../utils/imageHooks");

const TeamMemberSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true }, // e.g. CEO, Developer
  expertise: [{ type: String, required: true }], // e.g. ["AI", "Cloud", "MERN"]
  links: {
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
  },
});

deleteOldImageHook(TeamMemberSchema);

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
