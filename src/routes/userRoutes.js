// //USER SUB-ROUTING ROUTES
var router = require('express').Router();
const validator = require('../util/validator');
const user = require('../controllers/userController');

console.log('ROUTES')
var email_id = "";
module.exports = function (app, addon) {
   // module.exports = function () {
        console.log('IN UNDER')
    
        /*
        REGISTRATION 
        */
      
        router.post('/api/userRegister', function (req, res, next) {
            console.log('in rourter')
            email_id = req.body.email_id;
           let result1= validator.userRegister(req, res, next);
           console.log(result1,'RESULTTTTTTTTTTT');
        },
        function (req, res, next) {
            console.log('in ************');
            user.userRegister(req.body, res);
   });
    


    router.post('/api/userLogin',function (req, res, next) {
        console.log('in rourter')
        validator.userLogin(req, res, next);
    },
    function (req, res, next) {
        user.userLogin(req.body, res);
    });

    router.post('/api/forgetpass',function (req, res, next) {
        console.log('in rourter')
        validator.forgetpass(req, res, next);
    },
    function (req, res, next) {
        user.forgetpass(req.body, res);
    });
    router.post('/api/verifyOTP', function (req, res, next) {
        req.body.verification_otp = req.body.number1+req.body.number2+req.body.number3+req.body.number4;
        req.body.email_id = email_id;
        delete req.body.number1;
        delete req.body.number2;
        delete req.body.number3;
        delete req.body.number4;
        console.log("otp ----------------- ", req.body);
        validator.verifyOTP(req, res, next);
    }, function (req, res, next) {
        user.verifyOTP(req.body, res);
    });
    
    router.post('/api/ResendOTP', function (req, res, next) {
     validator.ResendOTP(req.body,res,next);       
    }, function (req, res, next) {
        user.ResendOTP(req.body, res);
    });

     
    return router;

}



//USER SUB-ROUTING ROUTES
// const router = require('express').Router();
// const validator = require('../util/validator');
// const user = require('../controllers/userController');

// console.log('ROUTES');

// router.post('/userRegister', function (req, res, next) {
//     console.log('in router');
//     let result1 = validator.userRegister(req, res, next);
//     console.log(result1, 'RESULTTTTTTTTTTT');
//     user.userRegister(req.body, res);
// });

// router.post('/userLogin', function (req, res, next) {
//     console.log('in router');
//     validator.userLogin(req, res, next);
//     user.userLogin(req.body, res);
// });

// router.post('/forgetpass', function (req, res, next) {
//     console.log('in router');
//     validator.forgetpass(req, res, next);
//     user.forgetpass(req.body, res);
// });

// router.post('/verifyOTP', function (req, res, next) {
//     validator.verifyOTP(req, res, next);
//     user.verifyOTP(req.body, res);
// });

// router.post('/ResendOTP', function (req, res, next) {
//     validator.ResendOTP(req.body, res, next);
//     user.ResendOTP(req.body, res);
// });

//module.exports = router;
