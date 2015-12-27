var QuestionGenerator = {};

/*
 * Set up connection
 */
QuestionGenerator.connect = function (url) {
	this.url = url;
};

/*
 * Return JSON object w/ questions generated from text
 */
QuestionGenerator.generateQuestion = function (text, cb) {
	cb({"status":"no text supplied!"});
	//TODO: add http req to qg and pass cb to it
};

module.exports = QuestionGenerator;

