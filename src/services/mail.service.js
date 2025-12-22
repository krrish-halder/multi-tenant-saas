const transporter = require("../config/mail");

exports.sendMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"${process.env.APP_NAME}" <no-reply@app.com>`,
    to,
    subject,
    html,
  });
};
