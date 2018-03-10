var ip='192.168.1.9';
var socket = io.connect(ip+":4200");


$(document).ready(function() {

	$('#openMenu').on('click',function()
	{
		$('.ui.labeled.icon.sidebar').sidebar('toggle');


	});

})();


