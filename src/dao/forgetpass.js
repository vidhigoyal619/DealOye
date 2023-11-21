const db1=require('../../db/config_details');

const file={
    forgetpass : (req,res,next)=>{
      let email= req.email_id;
      let  password=req.password;
     let confirm_pass = req.confirm_password;
      return new Promise((resolve, reject) => {
        db1.query('select * from users where email = ?', [email], (error, results) => {
            if (error) {
              console.log(error);
              reject(error);
            } else{ 
              if(results.length==0){
                resolve('Invalid email');
              }
              else if (results.length > 0) {
              const email2=results[0].email;
            if(password!=confirm_pass){
              resolve('password and confirm password not matched');
            }
             else if(email2==email&&password==confirm_pass){
             db1.query('update users set password =?  where email =?',[password,email],(error,results)=>{
               if(error){
                console.log(error);
                reject(error);
               } 
               else{
                 //res.send('data insert1');
                 resolve('Password changed')
                 console.log('Password is changed successfully');
               }
             })   
               
             // resolve('you are locked in');
             }
              
            }
          }
          });
    }
)}
}

module.exports=file;