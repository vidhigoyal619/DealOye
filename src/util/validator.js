const joi=require('joi');



exports.userRegister = function (req, res, next) {
	console.log('here in validator');
	const schema =joi.object().keys({
		username: joi.string().min(3).max(30).required(),
        email_id: joi.string().required(),
		phone:joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password: joi.string().min(8).max(12).required(),
        repeat_password: joi.ref('password')

	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log(req.body)
        console.log('validated fields',validFields)
		next();
		
	}
};


exports.userLogin=function(req,res,next){
	console.log('Insde validator');
	const schema=joi.object().keys({
		email_id:joi.string().required(),
		password: joi.string().min(8).max(12).required(),
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log(req.body)
        console.log('validated fields',validFields);
		next();
	}
};


exports.forgetpass=function(req,res,next){
	const schema=joi.object().keys({
		email_id:joi.string().required(),
		password:joi.string().min(8).max(12).required(),
		confirm_password:joi.string().min(8).max(12).required()
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log(req.body)
        console.log('validated fields',validFields);
		next();
	}
}


exports.verifyOTP = function (req, res, next) {
	console.log("otp verification")
	const schema = joi.object().keys({
		verification_otp: joi.string().required(),
		email_id: joi.string().required(),
		
	});
	
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log(req.body)
        console.log('validated fields',validFields);
		next();
	}
};


exports.ResendOTP=function(req, res, next)
{
	console.log('Inside ResendOTP');
	const schema = joi.object().keys({
		verification_otp: joi.string().required(),
		email_id: joi.string().required(),
	});
	let validFields = validateFields(req.body, res, schema);
	if (validFields) {
		console.log(req.body)
        console.log('validated fields',validFields);
		next();
	}
}
const validateFields = function (req, res, schema) {
	const validation = schema.validate(req);
	if (validation.error) {
		res.send(validation.error);
        console.log('SONI START',validation.error,'SONI');
		return false;
	}
	return true;
};