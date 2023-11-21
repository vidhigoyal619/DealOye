const express = require('express');
 const var1=require('./db/config_details');
const path = require('path');
const bodyParser = require('body-parser');
const app=express();


// const userRoutes = require('./src/routes/userRoutes');

// const app = express();
// app.listen(3001, () => {
//   console.log("Listening to the port");
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/visit.html'));
});
app.listen(3000,()=>{
    console.log("Listening to the port");
});
app.get('/', function (req, res) {
	res.redirect('/api');
});
//app.use(express.urlencoded({extended : false}))
//app.use(express.json());
app.use('/abc', require('./src/routes/userRoutes')(app));
console.log('Soni');
  // fronrtend connectivity (something new)
  app.use(express.static('public'));
 
  app.get("/abc/api/home.html", (req,res)=>{
    res.sendFile(__dirname+ "/public/home.html")
  })
  app.get("/abc/api/sell_layout.html" ,(req,res) =>
  {
    res.sendFile(__dirname+ "/public/sell_layout.html")
  })
  app.get("/abc/api/aboutus.html", (req,res)=> {
      res.sendFile(__dirname + "/public/aboutus.html");
  })
  app.get("/abc/api/termsOfService.html", (req,res)=> {
      res.sendFile(__dirname + "/public/termsOfService.html");
  })
  app.get("/abc/api/faqs.html", (req,res)=> {
      res.sendFile(__dirname + "/public//faqs.html");
  })
  app.get("/abc/api/contact.html" ,(req,res)=>
  {
    res.sendFile(__dirname+ "/public/contact.html")
  })
  app.get("/abc/api/spesific%20Product.html" ,(req,res)=>
  {
    res.sendFile(__dirname+ "/public/spesific Product.html")
  })
 
  app.post('/abc/api/sell_layout' , (req,res) =>{
       var title = req.body.title;
      var description = req.body.description;
     var price = req.body.price;
     console.log(req.body);
     var sql = "INSERT INTO vikas (title , description , price   ) VALUES ('"+title+"' , '"+description+"' ,  '"+price+"'    )";
      
         var1.query(sql ,function(error,result) {
           if(error) throw error; 
           res.sendFile(__dirname+ "/public/AddPosted.html")
           // res.send("Record register succesfully"+result.insertId);
        })
      });
      app.get('/abc/api/buy' , function(req,res){
      
             var sql = "select * from vikas";
           var1.query(sql, function(error , result){
                 if(error) console.log(error);
                  res.render(__dirname + "/public/buy.ejs",{buy :result} )
           });
           })
  
  
    // contact us database
    app.post('/abc/api/contact' , (req,res) =>{
      var name = req.body.name;
     var email = req.body.email;
    var message = req.body.message;
    var sql = "INSERT INTO contact (name , email, message   ) VALUES ('"+name+"' , '"+email+"' ,  '"+message+"')";
     
        var1.query(sql ,function(error,result) {
          if(error) throw error; 
         res.sendFile(__dirname+ "/public/contactteam.html")
         } )})
  

// // Use the userRoutes in the '/api' endpoint
// //app.use('/api', userRoutes);



// app.get('/' ,function(req,res){
//   res.redirect('/api');
// })
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use('/api', userRoutes)(app);

// // app.listen(3001, () => {
// //   console.log("Listening to the port");
// // });


//const express=require('express');

