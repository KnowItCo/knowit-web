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
	buffer: {type: Number, default: 10},
	bufferType: {type: String, default: 'random'},
	questions: [{
		original: String,
		question: String,
		answer: String,
		answered: Number, default: 0
	}]
});

UserSchema.statics.addQuestion = function (user, question, answer, cb) {
	user.questions.push({question: question, answer: answer});
	user.save(cb);
}

UserSchema.statics.addQuestions = function (user, questions, cb) {
	// questions should be array; [{...ref above for schema...}]
	for(i = 0; i < questions.length; i++) {
		user.questions.push(questions[i]);
	}
	user.save(cb);
}

UserSchema.statics.deleteQuestion = function (user, id, cb) {
	console.log("delq");
	console.log(user.questions);
	user.questions.pull({_id: id}, function (err,d) {
		console.log(err);
		console.log(d);
	});
	user.save(cb, function(err,d) {
		console.log(err);
		console.log(d);
	});
	console.log(user);
}

UserSchema.statics.getUserQuestions = function (user, cb) {
	qs = [];
	if (user.bufferType == "random") {
		while (qs.length < user.buffer) {
			randomq = user.questions[Math.floor(Math.random() * user.questions.length)];
			for (var i = 0; i < qs.length; i++) {
				if (qs[i].question == randomq.question) continue;
			}
			qs.push(randomq);
			if (qs.length == user.questions.length) break;
		}
	} else if (user.bufferType == "lra") {
		// sort the questions by # times answered

	}

	cb(qs);
}

module.exports = mongoose.model('User', UserSchema);