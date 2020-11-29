const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0].type);
			}
		});
	},
	getById: function(id, callback){
		var sql = "SELECT * from users WHERE username='"+id+"' ";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				console.log('welcome3');
				callback(results);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO users(username, password,type) VALUES ('"+user.username+"','"+user.password+"','"+user.type+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	update:function(user, callback){
		var sql = "UPDATE users SET name='"+user.name+"',companyname='"+user.companyname+"',contactno='"+user.contactno+"',username='"+user.username+"',password='"+user.password+"',type='"+user.type+"' WHERE id = '"+user.id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	getAllInformation: function(callback){
		var sql = "SELECT * FROM `place` ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	deleteInfo: function(id, callback){
		var sql = "DELETE FROM place WHERE country='"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	updateInfo: function(user, callback){
		console.log(user);
		var sql = "update place set general= '"+user.general+"',cost='"+user.cost+"' where country = '"+user.country+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertInfo: function(user, callback){
		var sql = "INSERT INTO `place` (`country`, `general`,`cost`) VALUES ('"+user.country+"', '"+user.general+"','"+user.cost+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	searchPlace: function(user, callback){
		var sql = "SELECT * FROM place WHERE "+user.searchby+" LIKE '%"+user.search+"%'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(false);
			}
		});
	},
	getAllCheckList: function(callback){
		var sql = "SELECT * FROM `checklist` ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	updateCheckList: function(user, callback){
		console.log(user);
		var sql = "update checklist set wishlist1= '"+user.wishlist1+"',wishlist2='"+user.wishlist2+"' ,wishlist3='"+user.wishlist3+"' where id = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateProfile:function(user, callback){
		var sql = "UPDATE users SET username='"+user.username+"',password='"+user.password+"',type='"+user.type+"' WHERE id = '"+user.id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
};