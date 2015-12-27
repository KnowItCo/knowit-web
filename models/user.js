var mongoose = require('mongoose');

var User = {
	fb: {
		id: String,
		access_token: String,
		name: String,
		firstName: String,
		lastName: String,
		email: String
	}
}

module.exports = mongoose.model('User', User);