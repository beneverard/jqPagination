$(document).ready(function() {

	$('.pagination').uzPagination({
		max_page	:	40,
		paged		:	function(page) {
			$('.log').prepend('<li>Requested page '+page+'</li>');
		}
	});

});