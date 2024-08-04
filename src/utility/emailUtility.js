const nodemailer = require("nodemailer");

const emailSend = async (email,emailSub,emailText)=>{


    const transport = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 587,
        secure: false,
        auth: {user: "info@teamrabbil.com", pass: '~sR4[bhaC[Qs'},
        tls: {rejectUnauthorized: false},
    });

    const options={
        from:"Mom & Baby <info@teamrabbil.com>",
        to:email,
        subject:emailSub,
        text:emailText
    };

    await transport.sendMail(options);

}

module.exports = emailSend;