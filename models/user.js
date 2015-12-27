var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	fb: {
		id: String,
		access_token: String,
		name: String,
		firstName: String,
		lastName: String,
		email: String
	},
	questions: [{
		question: String,
		answer: String
	}]
});

UserSchema.statics.addQuestion = function (user, question, answer, cb) {
	user.questions.push({question: question, answer: answer});
	user.save(cb);
}

UserSchema.statics.deleteQuestion = function (user, id, cb) {
	user.questions.pull({_id: id});
	user.save(cb);
}

module.exports = mongoose.model('User', UserSchema);