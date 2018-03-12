var ip='192.168.10.114';
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
		// if($(e.target).prop('id') == 'menu' || $(e.target).hasClass('sidebar')) return false;
		// $('.sidebar').sidebar('toggle');

		$( '#second' ).hide();
		$('#first').show();
		$('.tiny.modal').modal('show');
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


