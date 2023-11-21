const db1=require("../../db/config_details");

const file={
    userLogin :(req,res)=>{
      console.log('Inside daoooo');
    let email=req.email_id;
    let password=req.password;
  
    return new Promise((resolve, reject) => {
        db1.query('select * from users where email = ?', [email], (error, results) => {
          console.log(results, 'Soni');
          if(results.length==0){
              resolve('Invalid email or password');
          }
          else if (error) {
            console.log(error);
            reject(error);
          } else {
          if (results.length > 0) {
            const email2=results[0].email;
            const password2=results[0].password;
          if(email2==email&&password2==password){
           // res.send("Sucessfully login");
            resolve('Successfully logged in');
            console.log("Successfully logged in");
           }
           else if(password2!==password){
            resolve('Incorrect password');
           }
           else{
           resolve('The Email or paq password you entered is incorrects')
           }  
          }
        }
        });
    });
    }
};
module.exports=file;