var QuestionGenerator = {};
var request = require('request');

/*
 * Set up connection
 */
QuestionGenerator.connect = function (config) {
	this.protocol = config.protocol;
	this.host = config.host;
	this.port = config.port;
	this.path = config.path;
};

/*
 * Return JSON object w/ questions generated from text
 */
QuestionGenerator.generateQuestion = function (text, cb) {
	var url = this.protocol + this.host + ":" + this.port + this.path + "?text="+encodeURI(text);
	request.get({url: url}, function (err, httpResponse, body) { 
		if(err) {
			cb({'status': err});
		} else {
			cb(body);
		}
	});
};

module.exports = QuestionGenerator;