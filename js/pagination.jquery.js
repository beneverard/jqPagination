(function($){
	$.uzPagination = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("uzPagination", base);

		base.init = function(){

			base.options = $.extend({},$.uzPagination.defaultOptions, options);
			
			// set a few vars
			var page_string, current_page, max_page;
			
			var input = $('input', base.$el);
		
			current_page	=	input.data('current-page');
			max_page		=	input.data('max-page');
			page_string		=	'Page ' + current_page + ' of ' + max_page;
		
			input.val(page_string);
		
			input.live('mouseup',function() {
				var self = $(this);
				self.val(self.data('current-page')).select();
			});
			
			input.live('focus',function() {
				var self = $(this);
				self.val(self.data('current-page')).select();
			});
		
			input.live('blur',function() {
				var self = $(this);
				var page = self.val();
		
				self.data('prev-page', self.data('current-page'));
		
				if (IsNumeric(page) && (page > 0 && page <= max_page)) {
					self.val('Page ' + page + ' of ' + max_page);
					self.data('current-page', page);
				} else {
					self.val('Page ' + self.data('prev-page') + ' of ' + max_page);
				}
		
			});
			
		   	input.live('keydown',function(event) {
				if (event.keyCode == '13') {
					$(this).blur();
				}
			});
		
			base.$el.find('.next').live('click', function(event) {
				event.preventDefault();
		
				var current_page = input.data('current-page');
		
				if (current_page >= max_page) {
					return false;
				}
		
				var page = parseInt(current_page,10) + 1;
		
				input.val('Page ' + page + ' of ' + max_page);
		
				input.data('current-page', page);
		
			});
		
			base.$el.find('.previous').live('click', function(event) {
				event.preventDefault();
		
				var current_page = input.data('current-page');
		
				if (current_page <= 1) {
					return false;
				}
		
				var page = parseInt(current_page,10) - 1;
		
				input.val('Page ' + page + ' of ' + max_page);
		
				input.data('current-page', page);
		
			});
		
			base.$el.find('.first').live('click', function(event) {
				event.preventDefault();
		
				input.val('Page 1 of ' + max_page);
		
				input.data('current-page', 1);
		
			});
		
			base.$el.find('.last').live('click', function(event) {
				event.preventDefault();
		
				input.val('Page ' + max_page + ' of ' + max_page);
		
				input.data('current-page', max_page);
		
			});
	
			// Put your initialization code here
		};

		// Sample Function, Uncomment to use
		// base.functionName = function(paramaters){
		//
		// };
		
		// Run initializer
		base.init();
	};

	$.uzPagination.defaultOptions = {
		radius: "20px"
	};

	$.fn.uzPagination = function(options){
		return this.each(function(){
			(new $.uzPagination(this, options));

   				// HAVE YOUR PLUGIN DO STUFF HERE

   				// END DOING STUFF

		});
	};

})(jQuery);