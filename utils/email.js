const nodemailer = require("nodemailer");

exports.sendServiceRequest = async (req, res) => {
  console.log("📦 Incoming request body:", req.body);
  const { name, email, company, service, message } = req.body;

  try {
    // 1. Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_SEND_MAIL_FROM,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // 2. Setup email options
    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_SEND_MAIL_TO,
      subject: `New Service Request from ${name}`,
      html: `
        <h3>Service Request Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // 3. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send request.", error });
  }
};
