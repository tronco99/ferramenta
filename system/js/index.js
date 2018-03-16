var ip='localhost';
var socket = io.connect(ip+":4400");


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
		$('.tiny.modal')
		.modal({
			closable  : true,
			onDeny    : function(){
				return false;
			}
		})
		.modal('show')
		;
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
	if(data.includes("benvenuto")==true)
	{
		alert(data);
		$('.tiny.modal').modal('hide');
		return;
	}

	if(data=="registrazione effettuata con successo")
	{
		alert(data);
		$('.tiny.modal').modal('hide');
		return;

	}
	alert(data);


});

socket.on('formatoInvalido',function(data)
{

	switch(data)
	{
		case "1":
		{
			$('#emailField').removeClass('field');
			$('#emailField').addClass('field error');
			$('#email')
			.popup({
				position : 'right center',
				target   : '#email',
				title    : 'Errore',
				content  : 'email invalida'
			})
			;
			break;
		}
		case "2":
		{
			$('#passwordField').removeClass('field');
			$('#passwordField').addClass('field error');
			$('#password')
			.popup({
				position : 'left center',
				target   : '#password',
				title    : 'Errore',
				content  : 'almeno 1 lettera maiuscola e un numero'
			})
			;
			break;
		}
		case "3":
		{
			$('#confirmPasswordfield').removeClass('field');
			$('#confirmPasswordfield').addClass('field error');
			$('#password2')
			.popup({
				position : 'right center',
				target   : '#password2',
				title    : 'Errore',
				content  : 'le password non coincidono'
			})
			;
			break;
		}

	}
});


