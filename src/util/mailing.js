const nodemailer=require('nodemailer');


    function sendMail(req,res){
    let testAccount=nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'myles76@ethereal.email',
        pass: '14sHZAFAWaqqyg3Veq'
        },
      });
      
  const info = transporter.sendMail({
    from: '"Soni Rathore" <soni.rathore2003@gmail.com>', // sender address
    to: "sonirathore210388@acropolis.in", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  //res.json(info);
  return info;
};
