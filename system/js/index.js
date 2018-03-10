var ip='192.168.1.9';
var socket = io.connect(ip+":4200");


$(document).ready(function() {

	$('.ui .item').on('click', function() {
   $('.ui .item').removeClass('active');
   $(this).addClass('active');
}); 

	$('#openMenu').on('click',function()
	{
		$('.ui.labeled.icon.sidebar').sidebar('toggle');


	});
	$('#test').on('click',function()
	{
		$('.tiny.modal').modal('show');
	});


});


