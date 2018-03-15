var ip='192.168.1.35';
var socket = io.connect(ip+":4200");


$(document).ready(function() {
	$('.special.cards .image').dimmer({
		on: 'hover'
	});

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
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		{
			$('#tabLog').css('width','70%');
			$('.field').css('width','auto');
			
		}
		$( '#second' ).hide();
		$('#first').show();
		$('#confirm').html('accedi');

	});

	$('#registrati').on('click',function()
	{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		{
			$('#tabLog').css('width','auto');
			$('.field').css('width','50%');



		}

		$( '#first' ).hide();
		$('#second').show();
		$('#confirm').html('registrati');
		
	});

	$('#confirm').on('click',function()
	{
		if($('#confirm').text()=='registrati')
		{
			var toDb=new Array($('#nome').val(),$('#indirizzo').val(),$('#città').val(),$('#cap').val(),$('#nick').val(),$('#email').val(),$('#password').val(),$('#password2').val());
			socket.emit('registrazione',toDb);
		}
		else
			{
				var login=new Array($('#existmail').val(),$('#existpassword').val());
				 socket.emit('accedi',login);
			}

});


});


socket.on('noReg',function(data)
{
	alert(data);

});

