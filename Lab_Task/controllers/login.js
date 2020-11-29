const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		password: req.body.password,
		username: req.body.username
	};

	userModel.validate(user, function(status){
		if(status == "admin"){
			res.cookie('uname', req.body.username);
			res.redirect('/Admin_home');
		}
		else if(status == "scout"){
			res.cookie('uname', req.body.username);
			res.redirect('/Scout_home');
		}
		else if(status == "general"){
			res.cookie('uname', req.body.username);
			res.redirect('/Guser_home');
		}
		else{
			res.redirect('/login');
		}
	});
});

router.get('/Register', (req, res)=>{
	res.render('user/Gcreate');
});

router.post('/Register', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : req.body.type
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/login');
		}else{
			res.redirect('/Register');
		}
	});
});

module.exports = router;