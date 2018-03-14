var ip='192.168.10.103';
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

	$('#test').on('click',function(e)
	{
		$( '#second' ).hide();
		$('#first').show();
		$('.tiny.modal').modal('show');
		$("#accedi").addClass('active');
		$('#confirm').html('accedi');
	});

	$('#accedi').on('click',function()
	{
		$( '#second' ).hide();
		$('#first').show();
		$('#confirm').html('accedi');

	});

	$('#registrati').on('click',function()
	{
		$( '#first' ).hide();
		$('#second').show();
		$('#confirm').html('registrati');

		
		
	});


});


