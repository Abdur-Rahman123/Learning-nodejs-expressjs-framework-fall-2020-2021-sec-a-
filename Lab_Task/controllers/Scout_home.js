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

router.get('/updateProfile', (req, res)=>{

var user={
	id:req.cookies['uname']
}
	userModel.getById(req.cookies['uname'],function(results){
		res.render('Scout_home/editProfile', {users: results});
		console.log('welcome');
	});

});

router.get('/profileEdit/:id/:username/:password/:type', (req, res)=>{
	var user = {
		username:req.params.username,
		password:req.params.password,
		type:req.params.type
	 };

	res.render('Scout_home/profileEdit',user);
});

router.post('/profileEdit/:id/:username/:password/:type', (req, res)=>{
	var user = {
		id:req.params.id,
		username:req.body.username,
		password:req.body.password,
		type:req.body.type
	 };

	userModel.updateProfile(user, function(status){
		if(status){
			res.redirect('/Scout_home');
		}else{
			res.render('Scout_home/profileEdit');
		}
	});
});
module.exports=router;