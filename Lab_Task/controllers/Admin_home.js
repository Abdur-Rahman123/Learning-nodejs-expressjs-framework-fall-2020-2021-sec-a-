const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	
		next();
});

router.get('/', (req, res)=>{
	res.render('Admin_home/index', {name: req.cookies['uname']});
});
router.get('/Gcreate', (req, res)=>{
	res.render('user/Gcreate');
});

router.post('/Gcreate', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : '2'
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}else{
			res.redirect('/user/create');
		}
	});
});
router.get('/Screate', (req, res)=>{
	res.render('user/Screate');
});

router.post('/Screate', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : '1'
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}else{
			res.redirect('/user/create');
		}
	});
});
router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('Admin_home/userlist', {users: results});
	});

});
router.get('/delete/:id/:username/:password/:type', (req, res)=>{
	var user = {
		id:req.params.id,
		username:req.params.password,
		password:req.params.password,
		type:req.params.type
	 };

	res.render('user/delete',user);
});

router.post('/delete/:id/:username/:password/:email', (req, res)=>{

	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}else{
			res.redirect('/user/delete');
		}
	});
});

router.get('/Register', (req, res)=>{
	res.render('Admin_home/Register');
});

router.post('/Register', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : req.body.type
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Admin_home/userlist');
		}else{
			res.redirect('/Admin_home/Register');
		}
	});
});
module.exports=router;