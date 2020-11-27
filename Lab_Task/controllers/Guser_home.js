const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	
		next();
});

router.get('/', (req, res)=>{
	res.render('Guser_home/index', {name: req.cookies['uname']});
});
router.get('/Register', (req, res)=>{
	res.render('Guser_home/Register');
});

router.post('/Register', (req, res)=>{
	var user = {
		username : req.body.username,
		password : req.body.password,
		type : req.body.type
	}
	userModel.insert(user, function(status){
		if(status){
			res.redirect('/Guser_home/injex');
		}else{
			res.redirect('/Guser_home/Register');
		}
	});
});

router.get('/post', (req, res)=>{

	userModel.getAllInformation(function(results){
		res.render('Guser_home/Public_post', {users: results});
		//console.log('welcome');
	});

});

router.post('/search',(req,res)=>{
	var user = {
		search : req.body.search,
		searchby: req.body.searchby
	};
	userModel.searchPlace(user, function(results){
		if(results){
			res.json({user:results});
		}else{
			res.json({user:'error'});
		}
	});
});

router.get('/checklist', (req, res)=>{

	userModel.getAllCheckList(function(results){
		res.render('Guser_home/checklist', {users: results});
		//console.log('welcome');
	});

});

router.get('/editwish/:id/:wishlist1/:wishlist2/:wishlist3', (req, res)=>{
	var user = {
	     wishlist1:req.params.wishlist1,
		wishlist2:req.params.wishlist2,
		wishlist3:req.params.wishlist3
	 };

	res.render('Guser_home/editwish',user);
});

router.post('/editwish/:id/:wishlist1/:wishlist2/:wishlist3', (req, res)=>{
	var user = {
		   id:req.params.id,
	     wishlist1:req.body.wishlist1,
		wishlist2:req.body.wishlist2,
		wishlist3:req.body.wishlist3
	 };

	userModel.updateCheckList(user, function(status){
		if(status){
			res.redirect('/Guser_home');
		}else{
			res.render('Guser_home/editwish');
		}
	});
});


module.exports=router;