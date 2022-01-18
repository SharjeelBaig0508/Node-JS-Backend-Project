/* Node Imports */
var dotenv = require("dotenv");
dotenv.config();

/* Framework Imports */
var nodemailer = require("nodemailer");

/* Local Imports */
var response_codes = require("../utils/response_codes");

var transporter = nodemailer.createTransport({
  port: 465,
  host: process.env.EMAIL_HOST,
  auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  },
  secure: true
});

email_generator = async (body_data) => {
    var mail_data = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: body_data.subject,
        text: body_data.text,
        html: body_data.html
    };

    try{
        var message_info = await transporter.sendMail(mail_data);
    } catch (e) {
        console.error(e);
        return [ null,
                 response_codes.CODE_INTERNAL_SERVER_ERROR,
                 response_codes.MESSAGE_ERROR_WHILE_SENDING_EMAIL ];
    }


    return [ message_info,
             response_codes.CODE_RESPONSE_SUCCESS,
             response_codes.MESSAGE_RESPONSE_SUCCESS ];
}

module.exports = {
    email_generator
}