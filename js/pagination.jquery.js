/*

Inspiration for the layout came from these designs and colours:

http://dribbble.com/shots/22707-Tender-Pagination
http://dribbble.com/shots/59234-Pagination-for-upcoming-blog-

*/

(function($){
	$.uzPagination = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("uzPagination", base);

		base.init = function(){

			base.options = $.extend({},$.uzPagination.defaultOptions, options);
			
			// set the initial input value
			base.setPage();
			
			 //***************
			// BIND EVENTS
			
			base.$input.live('focus mouseup', function(event) {
			
				// if event == focus, select all text...
				if (event.type == 'focusin') {
					var self = $(this);
					self.val(self.data('current-page')).select();
				}
			
				// if event == mouse up, return false. Fixes Chrome bug
				if (event.type == 'mouseup') {
					return false;
				}
				
			});
			
			base.$input.live('blur keydown',function(event) {

				// if the user hits enter, trigger blur event but DO NOT set the page value
				if(event.keyCode=='13') {
					$(this).blur();
				}

				// only set the page is the event is focusout.. aka blue
				if (event.type==='focusout') {
					base.setPage($(this).val());
				}
				
			});
			
			base.$el.find('a').live('click', function(event) {
				event.preventDefault();
				base.setPage($(this).data('action'));
			});
			
		};
		
		base.setPage = function(page){
			
			var current_page	= parseInt(base.options.current_page,10),
				max_page		= base.options.max_page,
				page_string		= base.options.page_string;
			
			if(!IsNumeric(page)) {
				
				switch(page) {
				
					case 'first':
						page = 1;
						break;
						
					case 'prev':
					case 'previous':
						page = --current_page;					
						break;
						
					case 'next':
						page = ++current_page;
						break;
						
					case 'last':
						page = max_page;
						break;
				
				}
				
			}
			
			// if we're dealing with an invalid page value, use the current page
			// we cannot simply exit the script as we've already cleared the input
			if(!IsNumeric(page) || page<1 || page>max_page || page=='') {			
				page=base.options.current_page;
			}
			
			// set the current page
			base.setCurrentPage(page);
						
			// this looks horrible :-(
			page_string=page_string.replace("{current_page}", page)
								   .replace("{max_page}", max_page);
					   
			base.$input.val(page_string);
		
			base.options.paged(page);
			
		};
		
		base.setCurrentPage = function(page) {
			base.options.current_page=page;
			base.$input.data('current-page', page);
		};
				
		// Run initializer
		base.init();
		
	};

	$.uzPagination.defaultOptions = {
		page_string		:	'Page {current_page} of {max_page}',
		current_page	:	1,
		max_page		:	1,
		paged			:	function() {}
	};

	$.fn.uzPagination = function(options){
		return this.each(function(){
			(new $.uzPagination(this, options));

   				// HAVE YOUR PLUGIN DO STUFF HERE

   				// END DOING STUFF

		});
	};

})(jQuery);

function bIsNumeric(input) {
    return (input - 0) == input && input.length > 0;
}

function IsNumeric(val) {

    if (isNaN(parseFloat(val))) {

          return false;

     }

     return true

}
