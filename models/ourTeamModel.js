const mongoose = require("mongoose");

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

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
