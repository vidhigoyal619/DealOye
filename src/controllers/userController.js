const nodemailer = require('nodemailer');
const userDao = require('../dao/registration');
const jwt = require('jsonwebtoken');
const userDao1=require('../dao/login');
const userDao2=require('../dao/forgetpass');
const userDao3=require('../dao/ResendOTP');
const path = require('path');

// exports.userRegister = function (payload, res) {
//   console.log(payload, 'payload');
//   let otp = generateOTP();
//   console.log(otp, 'otp');
//   payload.otp = otp;
  
//   const token=jwt.sign({email_id:payload.email_id},"sonirathorevinianeeayushi",{
//     expiresIn :"2min"
//   });
//   console.log(token);
//   const verify =jwt.verify(token,"sonirathorevinianeeayushi");
//   console.log(verify,'VERIFY');

//   payload.token = token;
//   userDao.userRegister(payload).then((result) => {
//       console.log(result, 'result in controller');
     
// 	  if(result == 'User Already Registered'){
//       let responseData = {
//         statusCode:200,
//         Message:"User Already Registered",
//         Data:[]
//       }
//       res.status(200).send(responseData);
// 	  }
// 	  else{
//       let sendEmail = sendMail(payload, res);
//       console.log(sendEmail, 'sendEmail');
//       if(result == 'User Registered successfully'){
//         let responseData = {
//           statusCode:200,
//           Message:"User Registered successfully",
//           Data:[]
//         }
//         res.status(200).send(responseData);
//        // res.send('user Registered successfully');
//       }
      
// 	  }
//     })
//     .catch((error) => {
//       console.error(error);
//       // Handle the error appropriately
//       res.status(500).send('Internal Server Error');
//     });
// };
 // kuch naya 


 
exports.userRegister = function (payload, res) {
  console.log(payload, 'payload');
  let otp = generateOTP();
  console.log(otp, 'otp');
  payload.otp = otp;

  const token = jwt.sign({ email_id: payload.email_id }, "sonirathorevinianeeayushi", {
    expiresIn: "2min"
  });
  console.log(token);
  const verify = jwt.verify(token, "sonirathorevinianeeayushi");
  console.log(verify, 'VERIFY');

  payload.token = token;
  userDao.userRegister(payload)
    .then((result) => {
      if (result == 'User Already Registered') {
        res.status(400).json({ message: "User Already Registered" });
      } else if (result == 'User Registered successfully') {
        sendMail(payload, res); // Assuming sendMail is an asynchronous function

        // res.status(200).json({ message: "User Registered successfully" });
        const filePath = path.join(__dirname, '../../public/otp.html');
        res.status(200).sendFile(filePath);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
};


exports.userLogin=function(payload,res){
  userDao1.userLogin(payload).then((result)=>{
    console.log(result,'abbb');
    if(result == 'Successfully logged in'){
      let responseData ={
        statusCode: 200,
        Message : 'Successfully logged in',
        Data : []
       }
      res.status(200).send(responseData);
      const filePath = path.join(__dirname, '../../public/home.html');
        res.status(200).sendFile(filePath);
    }
   else if(result == 'Invalid email '){
    let responseData ={
      statusCode: 200,
      Message : 'Invalid email',
      Data : []
     }
    res.status(200).send(responseData);
   }
   else if(result=='Incorrect password'){
    let responseData ={
      statusCode: 200,
      Message : 'Incorrect password',
      Data : []
     }
    res.status(200).send(responseData);
    }
    else if(result=='Successfully logged in'){
      let responseData ={
        statusCode: 200,
        Message : 'Successfully logged in',
        Data : []
       }
      // res.status(200).send(responseData);
       const filePath = path.join(__dirname, '../../public/login.html');
       res.status(200).sendFile(filePath);
     
      }
    
  })
  .catch((error) => {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  });  
}
    
exports.forgetpass=function(payload,res){
  userDao2.forgetpass(payload).then((result)=>{
 console.log(result,'forgettttt');
 if(result == 'Password changed'){
   let responseData ={
     statusCode: 200,
     Message : 'Password changed',
     Data : []
    }
   res.status(200).send(responseData);
 }
else if(result == 'Invalid email'){
 let responseData ={
   statusCode: 200,
   Message : 'Invalid email',
   Data : []
  }
  const filePath=path.join(__dirname, '../../public/forgot.html');
  
 res.status(200).sendFile(filePath);
}
else if(result=='password and confirm password not matched'){
 let responseData ={
   statusCode: 200,
   Message : 'password and confirm password not matched',
   Data : []
  }
  res.status(200).send(responseData);
  }

  })
  .catch((error) => {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  });  
}

    
 
exports.ResendOTP=function(payload,res){
  userDao3.ResendOTP(payload).then((result)=>{
    let otp = generateOTP();
    payload.otp = otp;
 console.log(result,'resendOTP');
 if(result == 'Invalid email'){
  let responseData ={
    statusCode: 200,
    Message : 'Invalid email',
    Data : []
   }
 res.status(200).send(responseData);
//  const filePath=path.join(__dirname, '../../public/otp.html');
  
//  res.status(200).sendFile(filePath);
 }
 
 
else if(result == 'OTP send'){
  let sendEmail = sendMail(payload, res);
  let responseData ={
    statusCode: 200,
    Message : 'OTP send',
    Data : []
   }
  res.status(200).send(responseData);
}
  })
  .catch((error) => {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send('Internal Server Error');
  });  
}



exports.verifyOTP = function (payload, res) {
  console.log(payload, 'otpwala');

  userDao.verifyOtp(payload).then((result) => {
    console.log(result,'RESULT IN CONTROLLERRRRRRRR')
      // Handle the result if needed
      if(result == 'Invalid OTP'){
        let responseData ={
          statusCode: 400,
          Message : 'Invalid OTP',
          Data : []
         }
        res.status(400).send(responseData);
      }
     else if(result == 'OTP Verified'){
      let responseData ={
        statusCode: 200,
        Message : 'OTP Verified',
        Data : []
       }
      //res.status(200).send(responseData);
       const filePath = path.join(__dirname, '../../public/home.html');
       res.status(200).sendFile(filePath);
     }
     else if(result=='User not found'){
      let responseData ={
        statusCode: 200,
        Message : 'User not found',
        Data : []
       }
      res.status(200).send(responseData);
     }
    })
    .catch((error) => {
      console.error(error);
      // Handle the error appropriately
      res.status(500).send('Internal Server Error');
    });
};

function generateOTP() {
  var otp = Math.floor(100000 + Math.random() * 900000);
  otp = otp.toString().substring(0, 4);
  return otp;
}

function sendMail(req, res) {
  console.log(req, 'REQQQQQQ');
  let testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'coderaitr177@gmail.com',
      pass: 'ijfw rpga hfpk itus'
    },
  });

  transporter.sendMail(
    {
      from: 'coderaitr177@gmail.com',
      to: req.email_id,
      subject: 'DealOye OTP Verification',
      text: `Your OTP for DealOye Application is ${req.otp}`,
     // html: `<b>Your OTP for DealOye is </b>" ${req.otp}`,
     html : `<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>DealOye OTP Verification</title>
         <style>
             body {
                 font-family: Arial, sans-serif;
                 background-color: #f3f3f3;
                 margin: 0;
                 padding: 0;
             }
     
             .container {
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
                 background-color: #ffffff;
                 border-radius: 10px;
                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
             }
     
             .header {
                 text-align: center;
                 background-color: #007bff;
                 color: #fff;
                 padding: 20px 0;
                 border-radius: 10px 10px 0 0;
             }
     
             .header h1 {
                 font-size: 36px;
                 margin: 0;
             }
     
             .content {
                 margin-top: 20px;
                 text-align: center;
             }
     
             .otp-code {
                 font-size: 48px;
                 font-weight: bold;
                 color: #007bff;

             }
     
             .instructions {
                 font-size: 18px;
                 color: #555;
                 margin-top: 20px;
             }
     
             .footer {
                 margin-top: 20px;
                 text-align: center;
                 color: #888;
             }
     
             .footer p {
                 font-size: 14px;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <div class="header">
                 <h1>DealOye OTP Verification</h1>
             </div>
             <div class="content">
                 <p>Your OTP (One-Time Password) for verification is:</p>
                 <p class="otp-code">${req.otp}</p>
                 <p class="instructions">Please use this OTP to complete your registration.</p>
             </div>
             <div class="footer">
                 <p>&copy; 2023 DealOye. All rights reserved.</p>
             </div>
         </div>
     </body>
     </html>
     `
    },
    function (error, info) {
      if (error) {
        console.log(error);
        // Handle the error appropriately
        res.status(500).send('Email sending failed');
      } else {
        console.log('Email sent: ' + info.response);
        // Handle success if needed
        res.status(200).send('Email sent successfully');
      }
    }
  );
}
