// utils/seedTemplates.js (create this file)
const EmailTemplate = require("../models/emailTemplateModel");

const defaultTemplates = [
  {
    name: "service-request",
    subject: "New Service Request from {{name}}",
    htmlContent: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: 'Arial', sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 20px;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      color: white; 
      padding: 30px; 
      text-align: center; 
    }
    .logo { 
      font-size: 28px; 
      font-weight: bold; 
      margin-bottom: 10px;
    }
    .content { 
      padding: 30px; 
      color: #333;
    }
    .field { 
      margin-bottom: 15px; 
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
    .field strong { 
      color: #007bff; 
      display: block;
      margin-bottom: 5px;
    }
    .footer { 
      background: #f8f9fa; 
      padding: 20px; 
      text-align: center; 
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Your Company Name</div>
      <h2>New Service Request</h2>
    </div>
    <div class="content">
      <div class="field">
        <strong>Name:</strong> {{name}}
      </div>
      <div class="field">
        <strong>Email:</strong> {{email}}
      </div>
      <div class="field">
        <strong>Company:</strong> {{company}}
      </div>
      <div class="field">
        <strong>Service Needed:</strong> {{service}}
      </div>
      <div class="field">
        <strong>Message:</strong> {{message}}
      </div>
    </div>
    <div class="footer">
      <p>© 2024 Your Company Name. All rights reserved.</p>
      <p>This email was sent from your website contact form</p>
    </div>
  </div>
</body>
</html>
    `,
    variables: ["name", "email", "company", "service", "message"],
    isActive: true,
  },
];

const seedTemplates = async () => {
  try {
    for (const template of defaultTemplates) {
      await EmailTemplate.findOneAndUpdate({ name: template.name }, template, {
        upsert: true,
        new: true,
      });
    }
    console.log("✅ Email templates seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding templates:", error);
  }
};

module.exports = seedTemplates;
