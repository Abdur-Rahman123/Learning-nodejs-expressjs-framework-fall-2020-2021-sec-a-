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
		if(status == 0){
			res.cookie('uname', req.body.username);
			res.redirect('/Admin_home');
		}
		else if(status == 1){
			res.cookie('uname', req.body.username);
			res.redirect('/Scout_home');
		}
		else if(status == 2){
			res.cookie('uname', req.body.username);
			res.redirect('/Guser_home');
		}
		else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;