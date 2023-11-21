const var2 = require('../../db/config_details');
const jwt=require('jsonwebtoken');
const file1 = {
  userRegister: (req, res) => {
    const name = req.username;
    const email = req.email_id;
    const phone=req.phone;
    const password = req.password;
  
    const verification_otp = req.otp;
    const token = req.token;

    return new Promise((resolve, reject) => {
      var2.query('select * from users where email = ?', [email], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        } else if (results.length > 0) {
          console.log(results, 'RESULTSSSSSS');
          resolve('User Already Registered');
        } else {
          var2.query(
            'insert into users (name,email,phone,password,verification_otp,token) values(?,?,?,?,?,?)',
            [name, email,phone, password, verification_otp,token],
            (error, results) => {
              if (error) {
                console.log(error);
                reject(error);
              } else {
                //res.send('data insert1');
                console.log('data is inserted');
                resolve('User Registered successfully');
              }
            }
          );
        }
      });
    });
  },

  // verifyOtp: (req, res) => {
  //   const email = req.email_id;
  //   const otp = req.verification_otp;

  //   return new Promise((resolve, reject) => {
  //     var2.query('select verification_otp from users where email = ?', [email], (error, results) => {
  //       console.log(otp, 'user otp');
  //       console.log(results[0].verification_otp, 'query otp');
  //       if (error) {
  //         console.log(error);
  //         reject(error);
  //       } else {
  //         if (results.length === 0) {
  //           // User with the given email not found
  //           res.send("User not found");
  //         } else if (otp !== results[0].verification_otp) {
  //           // Invalid OTP
  //           res.resolve("Invalid OTP");
  //         } else {
  //           // OTP is valid
  //           console.log(otp, 'verified');
  //           console.log(results[0].verification_otp, 'verified');
  //           resolve(true);
  //         }
  //       }
  //     });
  //   });
  // },
  verifyOtp: (req, res) => {
    const email = req.email_id;
    const otp = req.verification_otp;

    return new Promise((resolve, reject) => {
      var2.query('select verification_otp from users where email = ?', [email], (error, results) => {
       // console.log(otp, 'user otp');
       // console.log(results[0].verification_otp, 'query otp');
        if (error) {
          console.log(error);
          reject(error);
        } else {
           if (results.length == 0) {
            resolve('User not found');
            // User with the given email not found
           // res.status(404).send("User not found");
          } else if (otp != results[0].verification_otp) {
            console.log('inside if esjse 1')
            // Invalid OTP
            resolve('Invalid OTP');
          //  res.status(400).send("Invalid OTP");
          } else {
            // OTP is valid
            console.log('inside esjse ')
            console.log(otp, 'verified');
            console.log(results[0].verification_otp, 'verified');
            resolve('OTP Verified', results[0].verification_otp);
          }
        }
      });
    });
  },


  rememberUser : (req,res)=>{
    const token=json.sign({id:email.toString()},"sonivinianeeayushirathore",{expiresIn : "2min"});
    console.log(token);
  }
};

module.exports = file1;
