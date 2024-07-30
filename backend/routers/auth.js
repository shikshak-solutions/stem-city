import express from 'express';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv  from 'dotenv';
import moment from 'moment';
import otpGenerator from 'otp-generator';
dotenv.config();
import { check, validationResult } from 'express-validator';
import {
  actionToGetAllUserApiCall,
  actionToGetUserDetailsByForgotPasswordTokenApiCall,
  actionToGetUserIsExistApiCall, actionToInsertGoogleUserApi,
  actionToInsertUserApi, getOtpDetailsByOptAndEmail, userPassWordByIdApiCall
} from "../models/Users.js";
import {actionToSendCustomEmail} from "../helper/emailNodeMailerHelper.js";
import {generateRandomString,updateCommonApiCall,insertCommonApiCall} from "../models/commonModel.js";
import expressAsyncHandler from "express-async-handler";
import {sendOtpSmsToMobile} from "../helper/CommonHelper.js";
const authRouter = express.Router();

// Sign up
authRouter.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const {email, name, password, mobile} = req.body;

    // Validate user input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    // Validate if user already exists
     await actionToGetUserIsExistApiCall(email).then(async (userData) => {
       if (userData?.id) {
         // 422 Unprocessable Entity: server understands the content type of the request entity
         // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
         return res.status(401).json({
           errors: [
             {
               email: userData?.email,
               mobile: userData?.mobile,
               msg: "User with this email address is already exist.",
             },
           ],
         });
       } else {
         // Hash password before saving to database
         const salt = await bcrypt.genSalt(10);

         const hashedPassword = await bcrypt.hash(password, salt);

         // Save email and password to database/array
         let user = {
           email: email,
           name: name,
           password: hashedPassword,
           mobile: mobile,
           role: 4
         }
                 let emailBodyHtml=`<body><h3> Thank you for register on Shikshak Solutions</h3>
        <p>Dear,${name}</p>
        <p>This email is just for inform you that you have benn successfully registered on Shikshak Solutions</p>
        <p></p>
        <h5>Thank you<br><b>Team Shikshak Solutions</b></h5>`;
                 let emailBodyText=` Thank you for register on Shikshak Solutions
        Dear,{name}
        This email is just for inform you that you have benn successfully registered on Shikshak Solutions
        Thank you Team Shikshak Solutions`;

          actionToInsertUserApi(user);
           actionToSendCustomEmail({
            'to': email,
            'subject': 'Signup Successfully',
            'cc': '',
            'bcc': '',
            'html':emailBodyHtml,
            'text': emailBodyText,
            'snippet': '',
            'account_type': 'gmail',
            'attachments': ''
          })
         // Do not include sensitive information in JWT
         const accessToken = await JWT.sign(
             {user},
             process.env.ACCESS_TOKEN_SECRET,
             {
               expiresIn: "1m",
             }
         );
         // Refresh token
         const refreshToken = await JWT.sign(
             { user },
             process.env.REFRESH_TOKEN_SECRET,
             {
               expiresIn: "5m",
             }
         );
         // Set refresh token in refreshTokens array
         refreshTokens.push(refreshToken);

         return res.json({
           accessToken: accessToken,
           refreshToken:refreshToken
         });
       }
    });

  }
);

authRouter.post(
    "/googleSignup",
    [
      check("email", "Invalid email").isEmail(),
      check("password", "Password must be at least 6 chars long").isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      const {email, name, password} = req.body;
      // Validate user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      // Validate if user already exists
      await actionToGetUserIsExistApiCall(email).then(async (userData) => {
        if (userData?.id) {
          console.log('147')
          // 422 Unprocessable Entity: server understands the content type of the request entity
          // 200 Ok: Gmail, Facebook, Amazon, Twitter are returning 200 for user already exists
          return res.status(401).json({
            errors: [
              {
                email: userData?.email,
                msg: "User with this email address is already exist.",
              },
            ],
          });
        } else {
          // Hash password before saving to database
          const salt = await bcrypt.genSalt(10);

          const hashedPassword = await bcrypt.hash(password, salt);

          // Save email and password to database/array
          let user = {
            email: email,
            name: name,
            password: hashedPassword,
            role: 4
          }
          let emailBodyHtml=`<body><h3> Thank you for register on Shikshak Solutions</h3>
        <p>Dear,${name}</p>
        <p>This email is just for inform you that you have benn successfully registered on Shikshak Solutions</p>
        <p></p>
        <h5>Thank you<br><b>Team Shikshak Solutions</b></h5>`;
          let emailBodyText=` Thank you for register on Shikshak Solutions
        Dear,{name}
        This email is just for inform you that you have benn successfully registered on Shikshak Solutions
        Thank you Team Shikshak Solutions`;

          await actionToInsertGoogleUserApi(user);
          await actionToSendCustomEmail({
            'to': email,
            'subject': 'Signup Successfully',
            'cc': '',
            'bcc': '',
            'html':emailBodyHtml,
            'text': emailBodyText,
            'snippet': '',
            'account_type': 'gmail',
            'attachments': ''
          })
          // Do not include sensitive information in JWT
          const accessToken = await JWT.sign(
              {user},
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "1m",
              }
          );
          // Refresh token
          const refreshToken = await JWT.sign(
              { user },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: "5m",
              }
          );
          // Set refresh token in refreshTokens array
          refreshTokens.push(refreshToken);

          return res.json({
            accessToken: accessToken,
            refreshToken:refreshToken
          });
        }
      });

    }
);

// Error status code
// 401 Unauthorized: it’s for authentication, not authorization. Server says "you're not authenticated".
// 403 Forbidden: it's for authorization. Server says "I know who you are,
//                but you just don’t have permission to access this resource".

///////////////////////////

// Get all users
authRouter.get("/users", actionToGetAllUserApiCall);

// Log in
authRouter.post("/login", async (req, res) => {

  const { email, password } = req.body;
  // Look for user email in the database
  let user = await actionToGetUserIsExistApiCall(email)

  // If user not found, send error message
  if (!user?.id) {
    return res.status(401).json({
      errors: [
        {
          msg: "Invalid Email/Mobile or password.",
        },
      ],
    });
  }

  // Compare hashed password with user password to see if they are valid
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Invalid Email/Mobile or password.",
        },
      ],
    });
  }

  // Send JWT access token
  const accessToken = await JWT.sign(
    { user },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );

  // Refresh token
  const refreshToken = await JWT.sign(
    { user },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  // Set refresh token in refreshTokens array
  refreshTokens.push(refreshToken);

 return res.json({
    accessToken,
    refreshToken,
  });
});

authRouter.post("/googleLogin", async (req, res) => {
  const { email } = req.body;
  // Look for user email in the database
  let user = await actionToGetUserIsExistApiCall(email)

  // If user not found, send error message
  if (!user?.id) {
    return res.status(400).json({
      errors: [
        {
          msg: "Selected Email address is not registered.",
        },
      ],
    });
  }

  // Send JWT access token
  const accessToken = await JWT.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
  );

  // Refresh token
  const refreshToken = await JWT.sign(
      { user },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
  );

  // Set refresh token in refreshTokens array
  refreshTokens.push(refreshToken);

  return res.json({
    accessToken,
    refreshToken,
  });
});

let refreshTokens = [];

// Create new access token from refresh token
authRouter.post("/token", async (req, res) => {
  const refreshToken = req.header("x-auth-token");

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
   // const { email } = user;
    const accessToken = await JWT.sign(
      { user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
});

// De-authenticate - log out
// Delete refresh token
authRouter.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});
// Forgot password
authRouter.post("/forgot-password", async (req, res) => {

  const { email } = req.body;
  // Look for user email in the database
  let user = await actionToGetUserIsExistApiCall(email)

  // If user not found, send error message
  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email address is not registered ",
        },
      ],
    });
  }else{
    const authToken  = generateRandomString(32);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let nowDateTime = date+' '+time;
    let setData = `token_forgot_password = "${authToken}",time_token_sent = "${nowDateTime}"`;
    let whereCondition = `id = "${user?.id}"`;
    let dataToSend = {column: setData, value: [authToken,nowDateTime], whereCondition: whereCondition, returnColumnName:'id',tableName: 'users'};
   await updateCommonApiCall(dataToSend).then( ()=>{
     let emailBodyHtml=`<body><h3> </h3>
        <p>Dear,${user?.name}</p>
        <p>This email is for your forgot password request, click on below Button to change your password</p>
        <p><b>Note: The below link button is valid for only 4 hrs</b></p>
        <p> <a href="http://localhost:3000/reset-password/${authToken}" style="display: block;color: #ffffff;background-color: #0E9AEF;border: solid 1px #0E9AEF;box-sizing: border-box;cursor: pointer;text-decoration: none;font-size: 13px;font-weight: 400;margin: 0;padding: 14px 24px;text-transform: capitalize;border-color: #0E9AEF;border-radius: 6px;" rel="noreferrer" target="_blank">
                            <span style="color: #ffffff!important;display:inline-block;text-decoration: none;">Reset your password</span></p>
        <p></p>
        <h5>Thank you<br><b>Team Shikshak Solutions</b></h5>`;
     let emailBodyText=` Forgot your password
        Dear,{name}
        This email is for your forgot password request, click on below Button to change your password
        Note: The below link button is valid for only 4 hrs
        Thank you Team Shikshak Solutions`;

      actionToSendCustomEmail({
       'to': email,
       'subject': 'Shikshak Solution - Forgot Password',
       'cc': '',
       'bcc': '',
       'html':emailBodyHtml,
       'text': emailBodyText,
       'snippet': '',
       'account_type': 'gmail',
       'attachments': ''
     })
     return res.status(200).json({
       success: [
         {
           msg: "Forgot password email has been sent.",
         },
       ],
     });
   });

  }
});
// Get User details by forgot password token
authRouter.post("/user-details-by-forgot-password-token", async (req, res) => {

  const { token } = req.body;

  // Look for user email in the database
  let user = await actionToGetUserDetailsByForgotPasswordTokenApiCall(token);
  // If user not found, send error message
  if (!user?.id) {
    return  res.status(200).send({status:3, message: 'invalid token.'});
  }else{
    const nowDateTime = moment();
    var end = moment(nowDateTime, "YYYY-MM-DD HH:mm:ss");
    var startTime = moment(user.time_token_sent, "YYYY-MM-DD HH:mm:ss");
    var mins = end.diff(startTime, 'minutes')
    // Check for password sent time difference if difference is less than or equal to 4 hrs (240 min) it will treat as a valid email
    if(mins<=240){
     return res.status(200).send({status:1, message: 'link is valid.'});
    }else{
      // Invalid the forgot password link when email was send more than 4 hrs (240 min) ago.
      return res.status(200).send({status:2, message: 'Link Expired user.'});
    }
  }
});
// Update new password using forgot password token
authRouter.post("/change-password", async (req, res) => {
  const { token,password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  let setData = `token_forgot_password = NULL,time_token_sent = NULL,password="${hashedPassword}"`;
  let whereCondition = `token_forgot_password = "${token}"`;
  let dataToSend = {column: setData, value: ["",""], whereCondition: whereCondition, returnColumnName:'id',tableName: 'users'};
  await updateCommonApiCall(dataToSend).then( ()=>{
    return res.status(200).send({status:1, message: 'Password changed successfully.'});
  });

});
authRouter.post("/update-user-personal-info", async (req, res) => {
  const {email, name, mobile, gender, id,password,role} = req.body;
  const salt = await bcrypt.genSalt(10);
  let setData = `name = ?,email = ?,mobile=?,gender=?`;
  let whereCondition = `id = "${id}"`;
  let dataToSend = {column: setData, value: [name,email,mobile,gender], whereCondition: whereCondition, returnColumnName:'id',tableName: 'users'};
  await updateCommonApiCall(dataToSend).then( async ()=>{
    // Save email and password to database/array
    let user = {
      email: email,
      name: name,
      password: password,
      mobile: mobile,
      gender: gender,
      id: id,
      role: role
    }
    // Do not include sensitive information in JWT
    const accessToken = await JWT.sign(
        {user},
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1m",
        }
    );
    // Refresh token
    const refreshToken = await JWT.sign(
        { user },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
    );
    // Set refresh token in refreshTokens array
    refreshTokens.push(refreshToken);

    return res.json({
      accessToken: accessToken,
      refreshToken:refreshToken
    });
  });

});
authRouter.post("/get-password-by-id", expressAsyncHandler(async (req, res) => {
  await userPassWordByIdApiCall(req.body).then( async (response)=>{
    // Compare hashed password with user password to see if they are valid
    let isMatch = await bcrypt.compare(req?.body?.currentPassword,response);

    if (!isMatch) {
      res.status(200).send({status:2, message: 'Current password is invalid.'});
    }else{
      res.status(200).send({status:1, message: ''});
    }
  });

}));
authRouter.post("/update-password", async (req, res) => {
  const { id,newPassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  let setData = `password="${hashedPassword}"`;
  let whereCondition = `id = "${id}"`;
  let dataToSend = {column: setData, value: ["",""], whereCondition: whereCondition, returnColumnName:'id',tableName: 'users'};
  await updateCommonApiCall(dataToSend).then( ()=>{
    return res.status(200).send({status:1, message: 'Password changed successfully.'});
  });

});
authRouter.post("/send-otp-for-login", async (req, res) => {
  const { emailMobileNo } = req.body;
  // Look for user email or mobile no in the database
  let user = await actionToGetUserIsExistApiCall(emailMobileNo)
  console.log(user,"user Details");

  // If user not found, send error message
  if (!user?.id) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email address or mobile no is not registered ",
        },
      ],
    });
  }else {
    let Otp = otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    const aliasArray = ['?', '?', '?'];
    const columnArray = ['code', "email_address_mobile_no", "time_created"];
    const valuesArray = [Otp, emailMobileNo, moment().format("YYYY-MM-DD HH:mm:ss")];
    const insertData = {alias: aliasArray, column: columnArray, values: valuesArray, tableName: 'two_factor_auth'};
    insertCommonApiCall(insertData).then((data) => {
      if(user?.email) {
        let emailBodyHtml = `<body><h3> </h3>
        <p>Dear,${emailMobileNo}</p>
        <p>Your verfication code is: <b>${Otp}</b></p>
        <p><b>Note: The above login verification code is set to expire in 5 minutes. After this period, you will need to resend the code or submit another request to login.</b></p>
        <p></p>
        <h5>Thank you<br><b>Team Shikshak Solutions</b></h5>`;
        let emailBodyText = ` Shikshak Solution - Verification code
        Dear,${user?.name}
        Your verfication code is: ${Otp}
        Note: The above login verification code is set to expire in 5 minutes. After this period, you will need to resend the code or submit another request to login
        Thank you Team Shikshak Solutions`;

        actionToSendCustomEmail({
          'to': user?.email,
          'subject': 'Shikshak Solution - Verification code',
          'cc': '',
          'bcc': '',
          'html': emailBodyHtml,
          'text': emailBodyText,
          'snippet': '',
          'account_type': 'gmail',
          'attachments': ''
        });
      }
      if(user?.mobile) {
        sendOtpSmsToMobile({mobile:user?.mobile,otp:Otp});
      }
      res.status(200).send({
        response: data,
      });
    });
  }

});
authRouter.post("/get-otp-details-by-otp-email", async (req, res) => {
  await getOtpDetailsByOptAndEmail(req.body).then( async (response)=>{
    if(response) {
      const nowDateTime = moment();
      let end = moment(nowDateTime, "YYYY-MM-DD HH:mm:ss");
      let startTime = moment(response?.time_created, "YYYY-MM-DD HH:mm:ss");
      let minsDifference = end.diff(startTime, 'minutes')
      if(minsDifference>=5){
        return res.status(200).send({status:3, message: 'Your OTP is invalid or expired.'});
      }else if( response?.is_active ===0){
        return res.status(200).send({status:4, message: 'Your OTP is invalid or expired.'});
      } else{
        // Look for user email in the database
        let user = await actionToGetUserIsExistApiCall(req.body?.emailOrMobile);
        // If user not found, send error message
        if (!user?.id) {
          return res.status(401).json({
            errors: [
              {
                msg: "Invalid Email/Mobile or password.",
              },
            ],
          });
        }
        const setData = `is_active = ?,time_used=?,is_verified=?`;
        const whereCondition = `code = '${req.body?.otp.toString()}' and email_address_mobile_no='${req.body?.emailOrMobile.toString()}'`;
        const value = ['0',moment().format("YYYY-MM-DD HH:mm:ss"),1];
        const dataToSend = {column: setData, value, whereCondition, tableName: 'two_factor_auth'};
       const update= await updateCommonApiCall(dataToSend);
        // Send JWT access token
        const accessToken = await JWT.sign(
            { user },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
        );

        // Refresh token
        const refreshToken = await JWT.sign(
            { user },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "5m",
            }
        );

        // Set refresh token in refreshTokens array
        refreshTokens.push(refreshToken);

        return res.json({
          accessToken,
          refreshToken,
        });
      }
    }else{
     return  res.status(200).send({status:2, message: 'Your OTP is invalid or expired.'});
    }
  });

});

export default authRouter;
