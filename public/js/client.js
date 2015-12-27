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