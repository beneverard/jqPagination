/*!
 * jqPagination, a jQuery pagination plugin (obviously)
 *
 * Copyright (C) 2011 Ben Everard
 *
 * http://beneverard.github.com/jqPagination
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *     
 */

(function ($) {
	"use strict";
	
	$.jqPagination = function (el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// get input jQuery object
		base.$input = base.$el.find('input');

		// Add a reverse reference to the DOM object
		base.$el.data("jqPagination", base);

		base.init = function () {

			base.options = $.extend({}, $.jqPagination.defaultOptions, options);				
			
			// if the user hasn't provided a max page number in the options try and find 
			// the data attribute for it, if that cannot be found, use one as a max page number
			
			if (base.options.max_page === null) {
			
				if (base.$input.data('max-page') !== undefined) {
					base.options.max_page = base.$input.data('max-page');
				} else {
					base.options.max_page = 1;
				}
				
			}
			
			// if the current-page data attribute is specified this takes priority
			// over the options passed in, so long as it's a number
			
			if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
				base.options.current_page = base.$input.data('current-page');
			}
			
			// remove the readonly attribute as JavaScript must be working by now ;-)			
			base.$input.removeAttr('readonly');
			
			// set the initial input value
			base.setPage();
			
			 //***************
			// BIND EVENTS
			
			base.$input.live('focus mouseup', function (event) {
			
				// if event === focus, select all text...
				if (event.type === 'focusin') {
					var $self = $(this);
					$self.val($self.data('current-page')).select();
				}
			
				// if event === mouse up, return false. Fixes Chrome bug
				if (event.type === 'mouseup') {
					return false;
				}
				
			});
			
			base.$input.live('blur keydown', function (event) {
				
				var $self			= $(this),
					current_page	= parseInt(base.options.current_page, 10);
				
				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(current_page);
					$self.blur();
				}
				
				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blue
				if (event.type === 'focusout') {
					base.setPage($self.val());
				}
				
			});
			
			base.$el.find('a').live('click', function (event) {
			
				// for mac + windows (read: other), maintain the cmd + ctrl click for new tab
				if (!event.metaKey && !event.ctrlKey) {
					event.preventDefault();
					base.setPage($(this).data('action'));
				}
				
			});
			
		};
		
		base.setPage = function (page) {
						
			var current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
			
			if (isNaN(parseInt(page, 10))) {
				
				switch (page) {
				case 'first':
					page = 1;
					break;
				case 'prev':
				case 'previous':
					page = current_page - 1;					
					break;
				case 'next':
					page = current_page + 1;
					break;
				case 'last':
					page = max_page;
					break;
				}
				
			}
			
			page = parseInt(page, 10);
			
			// if we're dealing with an invalid page value, use the current page
			// we cannot simply exit the script as we've already cleared the input
			if (isNaN(page) || page < 1 || page > max_page || page === current_page) {
				
				// set the current page
				base.setCurrentPage(current_page);
				
				// just set the value back to the current page 
				base.setInputValue(current_page);
								
			} else {
				
				// set the current page
				base.setCurrentPage(page);
				
				// set the input value
				base.setInputValue(page);
				
				// set the link href attributes
				base.setLinks(page);
				
				// fire the callback function with the current page
				base.options.paged(page);
				
			}
			
		};
		
		base.setCurrentPage = function (page) {
			base.options.current_page = page;
			base.$input.data('current-page', page);
		};
		
		base.setInputValue = function (page) {
		
			var page_string	= base.options.page_string,
				max_page	= base.options.max_page;
	
			// this looks horrible :-(
			page_string = page_string
				.replace("{current_page}", page)
				.replace("{max_page}", max_page);
					   
			base.$input.val(page_string);
		
		};
		
		base.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		
		base.setLinks = function (page) {
			
			var link_string		= base.options.link_string,
				current_page	= parseInt(base.options.current_page, 10),
				max_page		= parseInt(base.options.max_page, 10);
			
			if (link_string !== '') {
				
				// set initial page numbers + make sure the page numbers aren't out of range
					
				var previous = current_page - 1;
				if (previous < 1) {
					previous = 1;
				}
				
				var next = current_page + 1;
				if (next > max_page) {
					next = max_page;
				}
				
				// apply each page number to the link string, set it back to the element href attribute				
				base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
				base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
				base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
				base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));
				
			}
			
		};
						
		// Run initializer
		base.init();
		
	};

	$.jqPagination.defaultOptions = {
		current_page	: 1,
		link_string		: '',
		max_page		: null,
		page_string		: 'Page {current_page} of {max_page}',
		paged			: function () {}
	};

	$.fn.jqPagination = function (options) {
		
		return this.each(function () {
			(new $.jqPagination(this, options));
			
		});
	};

})(jQuery);