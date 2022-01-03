const nodemailer = require('nodemailer');
const config = require('../config')

async function sendCode(email, content) {
  try {
const transporter = nodemailer.createTransport(config.email);

await transporter.sendMail({
    from: "info@tasky.com",
    to: email,
    subject: "Código de Verificación",
    html: content,
})
  } catch (e) {
    throw e;
  }
}

module.exports = {
  sendCode,
};
