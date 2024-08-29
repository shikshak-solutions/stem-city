"use strict";
import nodemailer from 'nodemailer';


/**
 * This method is used to send email using node mailer email
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export const actionToSendCustomEmail = async (req) => {
    // create reusable transporter object using the default SMTP transport
    /*let transporter = nodemailer.createTransport({
        service: "gmail",
        // port: 587, // 8025, 587 and 25 can also be used.
        auth: {
            user: "shikshaksolutions@gmail.com",
            pass: "aftcbqpxchlojxse"
        }
    });*/
  //  console.log('sfaf',req)
    // Create a transporter
    const transporter = await nodemailer.createTransport({
        host: 'sg2plzcpnl489582.prod.sin2.secureserver.net',  // Replace with your SMTP host
        port: 465,                    // Replace with the appropriate port
        secure: true,                // Use true for port 465, false for 587 or 25
        auth: {
            user: 'contact@stemcity.in',  // Replace with your business email address
            pass: 'AsdfZ@2024'         // Replace with your email password
        }
    });
    // Verify the connection configuration
    transporter.verify((error, success) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Server is ready to send emails:', success);
        }
    });
 //   console.log('111mailDetail')
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
   // console.log(mailDetails,'mailDetail')
   return await transporter.sendMail(mailDetails, (error, info) => {
        if (error) {
            return {status:'error',message:error};
        } else {
            return {status:'success',message:info.response};
        }
    });
    //console.log(status,'status')
   // return status;
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
/*
* This method is used to send email using node mailer email
* @param req
* @param res
* @returns {Promise<*>}
*/
export const actionToSendEmail = async (req) => {
    return new Promise(async function(resolve, reject) {
        const transporter = await nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'stem.city2024@gmail.com',  // Replace with your business email address
                pass: 'yzrznmgumgkneiqk'         // Replace with your email password
            }
        });
        let mailDetails = {
            from: '"Team Stemcity" <test-support@stemcity.in>', // sender address
            to: req.to, // list of receivers
            cc: req.cc, // list of cc
            replyTo: (req?.replyTo) ? req?.replyTo : '',
            subject: req.subject, // Subject line
            text: (req.text) ? req.text.replace(/<[^>]+>/g, '') : req.html?.replace(/<[^>]+>/g, ''), // plain text body
            html: req.html, // html body
            attachments: req.attachments
        };
        return await transporter.sendMail(mailDetails, (error, info) => {
            if (error) {
                reject({status: 'error', message: error});
            } else {
                resolve({status: 'success', message: info.response});
            }
        });
    });
}
export const sendTestEmail =  ()=>{
    return new Promise(async function(resolve, reject) {
      let emailBodyHtml = `<body><h3> Thank you for register on Test</h3>
        <p>Dear, Anamika</p>
        <p>This email is just for inform you that you have benn successfully registered on Test</p>
        <p></p>
        <h5>Thank you<br><b>Team Shikshak Solutions</b></h5>`;
        let emailBodyText = ` Thank you for register on Test
        Dear,{name}
        This email is just for inform you that you have benn successfully registered on Test
        Thank you Team Test`;
       const emailData= await actionToSendEmail({
            'to': 'anamikasingh829@gmail.com',
            'subject': 'Signup Successfully',
            'cc': '',
            'bcc': '',
            'html': emailBodyHtml,
            'text': emailBodyText,
            'snippet': '',
            'account_type': 'gmail',
            'attachments': ''
        })
        console.log(emailData,'emailData');
       resolve('success')
    });
}

