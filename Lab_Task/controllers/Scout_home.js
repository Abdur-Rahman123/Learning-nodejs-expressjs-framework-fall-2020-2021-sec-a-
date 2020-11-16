const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	
		next();
});

router.get('/', (req, res)=>{
	res.render('Scout_home/index', {name: req.cookies['uname']});
});
router.get('/Register', (req, res)=>{
	res.render('Scout_home/Register');
});

router.post('/Register', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : req.body.type
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Scout_home/injex');
		}else{
			res.redirect('/Scout_home/Register');
		}
	});
});
module.exports=router;