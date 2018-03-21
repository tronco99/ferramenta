var ip='127.0.0.1';
var socket = io.connect(ip+":4200");
var currentItem = null;
var name; 

$(document).ready(function()
{
	var x = document.cookie;
	x = x.replace('username=','');

	if(x!="")
	{
		changeView(x);
		$('#utente').text(x);
		$('.tiny.modal').modal('hide');
		$('#test')
		.popup({
			on : 'click',
			popup : '#popup',
			position : 'bottom center',
			target   : '#test',
			hideOnScroll: 'false'
		});	
	}
	else
	{
		alert("0 cookie");
	}
	
	$("#logOut").click(function(){
		document.cookie="username=";
 		location.reload();
	});

	$("#tabLog").keypress(function(e) {
	    if(e.which == 13) {
	    	$('#confirm').click();
	    }
	});

	$('html').on('click',function()
	{
		$('#carrello').removeClass('active');
		$('#test').removeClass('active');
	});
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

	$('#test').on('click',function()
	{
		var classe = $('#icona').attr("class");

		if(classe=='user circle icon')
		{
			$('#test').popup('hide');
			$('#emailField').removeClass('field error');
			$('#emailField').addClass('field');
			$('#passwordField').removeClass('field error');
			$('#passwordField').addClass('field');
			$('#confirmPasswordfield').removeClass('field error');
			$('#confirmPasswordfield').addClass('field');
			$('#nicknameField').removeClass('field error');
			$('#nicknameField').addClass('field');


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

		}
		
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

	$('#nickname').on('change',function()
	{
		var veryControlled=$('#nicknameField').attr('class');
		$('#nicknameField').removeClass(veryControlled);
		$('#nicknameField').addClass('field')
	});
	$('#email').on('change',function()
	{
		var veryControlled=$('#emailField').attr('class');
		$('#emailField').removeClass(veryControlled);
		$('#emailField').addClass('field')
	});
	$('#password').on('change',function()
	{
		var veryControlled=$('#passwordField').attr('class');
		$('#passwordField').removeClass(veryControlled);
		$('#passwordField').addClass('field')
		
	});
	$('#password2').on('change',function()
	{
		var veryControlled=$('#confirmPasswordfield').attr('class');
		$('#confirmPasswordfield').removeClass(veryControlled);
		$('#confirmPasswordfield').addClass('field')
	});


});


socket.on('noReg',function(data)
{
	if(data.includes("benvenuto")==true)
	{
		$('#utente').text(data.replace('benvenuto ',''));
		document.cookie = "username="+data.replace('benvenuto ','');
		

		changeView(data);
		$('.tiny.modal').modal('hide');
		$('#test')
		.popup({
			on : 'click',
			popup : '#popup',
			position : 'bottom center',
			target   : '#test',
			hideOnScroll: 'false'
		});	
		return;

		

	}

	if(data=="registrazione effettuata con successo")
	{
		alert(data);
		$('.tiny.modal').modal('hide');
		return;

	}
	


});

socket.on('formatoInvalido',function(data)
{

	switch(data)
	{
		case "1":
		{
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
			{
				$('#emailField').removeClass('field');
				$('#emailField').addClass('field error');
				$('#email')
				.popup({
					position : 'bottom center',
					target   : '#email',
					title    : 'Errore',
					content  : 'email invalida',
					hideOnScroll: 'false'
				});
				break;
			}
			else
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
		}
		case "2":
		{
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
			{
				$('#passwordField').removeClass('field');
				$('#passwordField').addClass('field error');
				$('#password')
				.popup({
					position : 'top center',
					target   : '#password',
					title    : 'Errore',
					content  : 'almeno 1 lettera maiuscola e un numero',
					hideOnScroll: 'false'

				});
				break;
			}
			else
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
		case "4":
		{
			$('#nicknameField').removeClass('field');
			$('#nicknameField').addClass('field error');
			$('#nick')
			.popup({
				position : 'left center',
				target   : '#nick',
				title    : 'Errore',
				content  : 'il nickname non può contenere la @'
			})
			;
			break;
		}
		case "5":
		{
			alert('nessun campo può esser lasciato vuoto');
			break;
		}

	}

	

	
});
function changeView(a)
	{
		name = a.replace('benvenuto ','');
		$('#test').find("i").removeClass("user circle icon");
		$('#test').find("i").addClass("address card icon");
	}



