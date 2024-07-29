"use strict";
import nodemailer from 'nodemailer';


/**
 * This method is used to send email using node mailer email
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const actionToSendCustomEmail = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587, // 8025, 587 and 25 can also be used.
        auth: {
            user: "shikshaksolutions@gmail.com",
            pass: "aftcbqpxchlojxse"
        }
    });
    let mailDetails = {
        from: '"Team Stemcity" <test-support@stemcity.in>', // sender address
        to: req.to, // list of receivers
        cc: req.cc, // list of cc
        replyTo: (req?.replyTo) ? req?.replyTo:'',
        subject: req.subject, // Subject line
        text: (req.text) ? req.text.replace(/<[^>]+>/g, '') : req.html?.replace(/<[^>]+>/g, ''), // plain text body
        html: req.html, // html body
        attachments:req.attachments
    };
    return  transporter.sendMail(mailDetails);
}
/** send mail from real gmail account */
// export const actionToSendCustomEmails = async  (req, res) => {
//
//     const { userEmail } ="Hello World";
//
//     let config = {
//         service : 'gmail',
//         auth : {
//             user: 'dev2000test@gmail.com',
//             pass: '9990873305*'
//         }
//     }
//
//     let transporter = nodemailer.createTransport(config);
//
//     let MailGenerator = new Mailgen({
//         theme: "default",
//         product : {
//             name: "Mailgen",
//             link : 'https://mailgen.js/'
//         }
//     })
//
//     let response = {
//         body: {
//             name : "Daily Tuition",
//             intro: "Your bill has arrived!",
//             table : {
//                 data : [
//                     {
//                         item : "Nodemailer Stack Book",
//                         description: "A Backend application",
//                         price : "$10.99",
//                     }
//                 ]
//             },
//             outro: "Looking forward to do more business"
//         }
//     }
//
//     let mail = MailGenerator.generate(response)
//
//     let message = {
//         from : 'dev2000test@gmail.com',
//         to : 'devp29@osolutions.com.au',
//         subject: "Place Order",
//         html: mail
//     }
//
//     let info = await transporter.sendMail(message);
// return info;
//     // res.status(201).json("getBill Successfully...!");
// }

