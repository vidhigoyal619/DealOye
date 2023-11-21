const db1=require('../../db/config_details');

const file={
    ResendOTP: (req,res,next)=>{
      let email= req.email_id;
      let verification_otp= req.otp;
      return new Promise((resolve, reject) => {
        db1.query('select * from users where email = ?', [email], (error, results) => {
            if (error) {
              console.log(error);
              reject(error);
            } 
            else{ 
              if(results.length==0){
                resolve('Invalid email');
              }
              else if (results.length > 0) {
              const email2=results[0].email;
               if(email2==email){
                db1.query('update users set verification_otp =?  where email =?',[verification_otp,email],(error,results)=>{
                    if(error){
                     console.log(error);
                     reject(error);
                    } 
                    else{
                        //res.send('data insert1');
                     resolve('OTP send')
                        console.log('Otp send successfully');
                      }
               })
               
             // resolve('you are locked in');
             }
              
            }
          }
            })    }
)}
}

module.exports=file;