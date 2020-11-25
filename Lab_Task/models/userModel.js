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
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
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
		var sql = "SELECT * FROM `information` ";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	deleteInfo: function(id, callback){
		var sql = "DELETE FROM information WHERE infoId='"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
	updateInfo: function(user, callback){
		console.log(user);
		var sql = "update information set information= '"+user.information+"' where infoId = '"+user.id+"'";
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertInfo: function(user, callback){
		var sql = "INSERT INTO `information` (`infoId`, `information`) VALUES (NULL, '"+user.information+"')";
		//console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
	},
};