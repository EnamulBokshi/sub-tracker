export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft
}) => {
  return `<html>
  <head>
    <meta charset="utf-8">
    <title>Subscription Renewal Reminder</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #4f46e5;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .content {
        padding: 20px;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 5px 5px;
      }
      .button {
        display: inline-block;
        background-color: #4f46e5;
        color: white;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        margin: 20px 0;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Subscription Renewal Reminder</h1>
    </div>
    <div class="content">
      <p>Hello ${userName},</p>
      <p>This is a reminder that your <strong>${subscriptionName}</strong> subscription is due for renewal.</p>
      
      <p><strong>Plan:</strong> ${planName}</p>
      <p><strong>Renewal Date:</strong> ${renewalDate}</p>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Days Left:</strong> ${daysLeft}</p>
      
      <p>You can manage your subscription settings <a href="${accountSettingsLink}">here</a>.</p>
      
      <p>If you have any questions, please visit our <a href="${supportLink}">support page</a>.</p>
      
      <p>Best regards,<br/>The Subscription Tracker Team</p>
    </div>
    <div class="footer">
      <p>This email was sent from our platform.</p>
    </div>
  </body>
  </html>`
}

export const emailTemplates = [
    {
        label: "7 Days Before Renewal",
        generateSubject:(data)=>`Reminder: Your ${data.subscriptionName} subscription will renew in 7 days`,
        generateBody: (data) => generateEmailTemplate(data)
    },
    {
        label: "3 Days Before Renewal",
        generateSubject:(data)=>`Reminder: Your ${data.subscriptionName} subscription will renew in 3 days`,
        generateBody: (data) => generateEmailTemplate(data)
    },
    {
        label: "1 Day Before Renewal",
        generateSubject:(data)=>`Reminder: Your ${data.subscriptionName} subscription will renew in 1 day`,
        generateBody: (data) => generateEmailTemplate(data)
    }
]

