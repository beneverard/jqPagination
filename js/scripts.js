$(document).ready(function() {

	$('.pagination').uzPagination({
		max_page	:	40,
		paged		:	function(page) {
			console.info("We're on page "+page);
		}
	});

});