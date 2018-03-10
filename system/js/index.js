var ip = 'localhost'
var socket = io.connect(ip+":4200");

$(document).ready(function()
{
	$('#prova').on('click',function()
	{
		$('.ui.labeled.icon.sidebar').sidebar('toggle');
	});
});
