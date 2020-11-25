const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{

	userModel.getAllInformation(function(results){
		res.render('home/index', {users: results});
	});

});
module.exports=router;