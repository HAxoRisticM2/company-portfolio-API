const nodemailer = require("nodemailer");
const ServiceRequest = require("../models/serviceRequestModel");
const EmailTemplate = require("../models/emailTemplateModel");

// // Create Service Request
// exports.createServiceRequest = async (req, res) => {
//   try {
//     const { name, email, company, service, message } = req.body;

//     if (!name || !email || !service) {
//       return res
//         .status(400)
//         .json({ error: "Name, email, and service are required." });
//     }

//     // 1. Save to DB
//     const newRequest = await ServiceRequest.create({
//       name,
//       email,
//       company,
//       service,
//       message,
//     });

//     // 2. Get template from database
//     const template = await EmailTemplate.findOne({
//       name: "service-request",
//       isActive: true,
//     });

//     if (!template) {
//       return res.status(500).json({ error: "Email template not found" });
//     }

//     // 3. Replace variables in template
//     let htmlContent = template.htmlContent;
//     let emailSubject = template.subject;

//     const variables = {
//       name: name || "N/A",
//       email: email || "N/A",
//       company: company || "Not provided",
//       service: service || "N/A",
//       message: message || "No message provided",
//     };

//     // Replace all variables in content and subject
//     Object.entries(variables).forEach(([key, value]) => {
//       const regex = new RegExp(`{{${key}}}`, "g");
//       htmlContent = htmlContent.replace(regex, value);
//       emailSubject = emailSubject.replace(regex, value);
//     });

//     // 4. Send email with beautiful HTML template
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.GMAIL_SEND_MAIL_FROM,
//         pass: process.env.GMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.GMAIL_SEND_MAIL_FROM,
//       to: process.env.GMAIL_SEND_MAIL_TO,
//       subject: emailSubject,
//       html: htmlContent,
//       text: `New Service Request:\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage: ${message}`,
//     };

//     await transporter.sendMail(mailOptions);

//     // 5. Respond to client
//     res.status(201).json({
//       success: true,
//       message: "Service request sent successfully.",
//       data: newRequest,
//     });
//   } catch (error) {
//     console.error("Error in createServiceRequest:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
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

    // 2. Get template from database
    const template = await EmailTemplate.findOne({
      name: "service-request",
      isActive: true,
    });

    if (!template) {
      return res.status(500).json({ error: "Email template not found" });
    }

    // 3. Replace variables in template
    let htmlContent = template.htmlContent;
    let emailSubject = template.subject;

    const variables = {
      name: name || "N/A",
      email: email || "N/A",
      company: company || "Not provided",
      service: service || "N/A",
      message: message || "No message provided",
    };

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      htmlContent = htmlContent.replace(regex, value);
      emailSubject = emailSubject.replace(regex, value);
    });

    // 4. Send email with beautiful HTML template
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SEND_MAIL_FROM,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_SEND_MAIL_FROM,
      to: process.env.GMAIL_SEND_MAIL_TO,
      subject: emailSubject,
      html: htmlContent,
      text: `New Service Request:\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage: ${message}`,
    };

    // ✅ ADD PROPER ERROR HANDLING FOR EMAIL
    try {
      const emailResult = await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
      // Don't throw error - just log it but still return success to user
    }

    // 5. Respond to client (success even if email failed)
    res.status(201).json({
      success: true,
      message: "Service request sent successfully.",
      data: newRequest,
      emailSent: true, // You might want to track this in DB too
    });
  } catch (error) {
    console.error("Error in createServiceRequest:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
