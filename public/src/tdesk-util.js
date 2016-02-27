(function(global){
	'use strict';

	function readQuery(param){
		var qs = window.location.search;

		var begin = qs.indexOf(param) + param.length + 1;
		var end = qs.indexOf('&', begin);

		end =  (end > 0) ? end : qs.length;

		return qs.substring(begin, end);

	}
	
	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.readQuery = readQuery;
}(window));