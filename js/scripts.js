/*
 * PAGINATION PLUGIN
 * ----------------------------
 *
 * Requirements
 * - A callback when a new page has been requested
 * - Maintain chainability
 * 
 */

function setPaginationText(element, cur, max) {

}

function IsNumeric(input) {
    return (input - 0) == input && input.length > 0;
}

$(document).ready(function() {

	$('.pagination').uzPagination();

});