const nodemailer = require("nodemailer");
const ServiceRequest = require("../models/serviceRequestModel"); // Your Mongoose model

// Create Service Request
exports.createServiceRequest = async (req, res) => {
  try {
    const { name, email, company, service, message } = req.body;

    if (!name || !email || !service) {
      return res
        .status(400)
        .json({ error: "Name, email, and service are required." });
    }

    // 1. Save to DB
    const newRequest = await ServiceRequest.create({
      name,
      email,
      company,
      service,
      message,
    });

    // 2. Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SEND_MAIL_FROM,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_SEND_MAIL_FROM,
      to: process.env.GMAIL_SEND_MAIL_To, // Who should receive the request
      subject: `New Service Request from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || "N/A"}
        Service: ${service}
        Message: ${message || "N/A"}
      `,
    };

    await transporter.sendMail(mailOptions);

    // 3. Respond to client
    res.status(201).json({
      success: true,
      message: "Service request sent successfully.",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error in createServiceRequest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
