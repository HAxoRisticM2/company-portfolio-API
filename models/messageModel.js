// models/Message.js (Mongoose Example)
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String, // Important for service requests!
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    service: String, // e.g., "Web Development", "Consulting". Helps with categorization.
    status: {
      type: String,
      enum: ["new", "read", "replied", "closed"], // Critical for management!
      default: "new",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Link to an admin user if you have multiple admins
    },
    notes: [
      {
        note: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        createdBy: String, // Admin name or ID
      },
    ], // Internal notes for tracking follow-ups
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Message", MessageSchema);
