const sql = require('./db.js');

//constructor
const User = function(user){
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
};

User.create = (newUser, result) => {
	sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
	if (err) {
		result(err, null);
		return err;
	}
	console.log("created user", {id: res.insertId, ...newUser});
	return(null, {id: res.insertId, ...newUser});
    });
};

User.loginAuth = (user, result) => {
	sql.query("SELECT * FROM users WHERE email = ? && password = ?", [user.email, user.password], (err, rows) => {
	if(err) {
		result(err,null)
		return err;
	}
	console.log(`successful login, ${user.email}`);
	return(null, {email: res.email, password: res.password});
	});
};
module.exports = User;