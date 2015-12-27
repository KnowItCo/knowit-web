var deleteQuestion = function(e) {

	var questionToDeleteOnSuccess = e.parentNode;
	var parent = questionToDeleteOnSuccess.parentNode;

	$.ajax({
	   url: '/create',
	   type: 'DELETE',
	   data: {id: questionToDeleteOnSuccess.id},
	   success: function(response) {
	   		parent.removeChild(questionToDeleteOnSuccess);
	   }
	});
}

var saveQuestion = function (e) {

	var questionToDeleteOnSuccess = e.parentNode;
	var parent = questionToDeleteOnSuccess.parentNode;

	var item = $(e.parentNode);

	$.ajax({
	   url: '/generate',
	   type: 'POST',
	   data: {question: item.data('question'), answer: item.data('answer')},
	   success: function(response) {
	   		parent.removeChild(questionToDeleteOnSuccess);
	   }
	});
}


var updateDomWithGeneratedQuestions = function (data) {

	$('#generated_question_list').empty();

	$.each(data, function(i, item){
		var t = $('<div class="question_item"></div>');
		t.data('question', item['question']);
		t.data('answer', item['answer']);

		t.append("Q: " + item['question'] + " <br />");
		t.append("A: " + item['answer'] + " <br />");
		t.append('<button onclick="saveQuestion(this)">Save!</button>');

		$('#generated_question_list').append(t);
	})
}


var generateQuestions = function(e) {
	var text = $('#'+e).val();

	$.ajax({
	   url: '/api/generate',
	   type: 'POST',
	   data: {text: text},
	   success: function(response) {
	   		updateDomWithGeneratedQuestions(JSON.parse(response));
	   }
	});
}