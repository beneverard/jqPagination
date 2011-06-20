$(document).ready(function() {

	$('.pagination').uzPagination({
		max_page	:	40,
		link_string	:	'/?page={page_number}',
		paged		:	function(page) {
			$('.log').prepend('<li>Requested page '+page+'</li>');
		}
	});

});