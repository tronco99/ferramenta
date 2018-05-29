var ip='192.168.1.171';
var socket = io.connect(ip+":4200");
var currentItem = null;
var name; 
var p = 0;
var prodotti=0;
$(document).ready(function()
{
	$('.special.cards .image').dimmer({
		on: 'hover'
	});
	$('#tipo').text("--seleziona tipo--");
	$('#tipo2').text("--seleziona tipo--");
	$('#tipo3').text("--seleziona tipo--");
	$('.ui.dropdown')
	.dropdown();

  $('#drop1').on('change',function() //seleziono prodotti
  {
  	var control=$('#drop1').val().replace("'","");
  	$('#pro1').html("");
  	for (var i = 0; i < prodotti.length; i++) {
  		if(prodotti[i].tipo2==control)
  		{
  			$('#pro1').append($('<div class="elem"><div class="ui special cards"><div class="card" id="provaImmagine"><div class="blurring dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button">Dettagli</div></div></div></div><img src="'+prodotti[i].immagine+'"></div><div class="content"><a class="header">'+prodotti[i].nome+'</a><div class="meta"><span class="date">'+prodotti[i].recensione+'</span></div></div><div class="extra content"><a><i class="users icon"></i>'+prodotti[i].prezzo+'</a></div></div></div></div>'));
  		}
  	}
  });
    $('#drop2').on('change',function() //seleziono prodotti
    {
    	var control=$('#drop2').val().replace("'","");
    	$('#pro2').html("");
    	for (var i = 0; i < prodotti.length; i++) {
    		if(prodotti[i].tipo2==control)
    		{
    			$('#pro2').append($('<div class="elem"><div class="ui special cards"><div class="card" id="provaImmagine"><div class="blurring dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button">Dettagli</div></div></div></div><img src="'+prodotti[i].immagine+'"></div><div class="content"><a class="header">'+prodotti[i].nome+'</a><div class="meta"><span class="date">'+prodotti[i].recensione+'</span></div></div><div class="extra content"><a><i class="users icon"></i>'+prodotti[i].prezzo+'</a></div></div></div></div>'));
    		}
    	}
    });
      $('#drop3').on('change',function() //seleziono prodotti
      {
      	var control=$('#drop3').val().replace("'","");
      	$('#pro3').html("");
      	for (var i = 0; i < prodotti.length; i++) {
      		if(prodotti[i].tipo2==control)
      		{
      			$('#pro3').append($('<div class="elem"><div class="ui special cards"><div class="card" id="provaImmagine"><div class="blurring dimmable image"><div class="ui dimmer"><div class="content"><div class="center"><div class="ui inverted button">Dettagli</div></div></div></div><img src="'+prodotti[i].immagine+'"></div><div class="content"><a class="header">'+prodotti[i].nome+'</a><div class="meta"><span class="date">'+prodotti[i].recensione+'</span></div></div><div class="extra content"><a><i class="users icon"></i>'+prodotti[i].prezzo+'</a></div></div></div></div>'));      		}
      		}
      	});



//--------------------------------------

$("#tagP").hide();
$(".pressed").on('click',function()
{
	$('#tipo').text("--seleziona tipo--");
	$('#tipo2').text("--seleziona tipo--");
	$('#tipo3').text("--seleziona tipo--");
	var text=$(this).text();
	$("#tagP").html(text);
	$('#tagP').removeClass('black');
	$('#tagP').addClass('blue');
	$("#tagP").show();
	$('.ui.labeled.icon.sidebar').sidebar('hide');
	$('#forproduct').css('visibility','visible');
	socket.emit('caricaProdotti',text);
	$('#pro1').html('');
	$('#pro2').html('');
	$('#pro3').html('');

	$('#drop1').val().replace($('#drop1').val()+"","yaya come ture");

//	alert(control);
	//$('#drop1').val().replace('','');

});
var x = document.cookie;
x = x.replace('username=','');

$('#userSett').hide();


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


$("#logOut").on('click',function(){
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
		socket.emit('cambiaDb','qualsiasi');
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

$('#userSett').on('click',function()
{
	window.location.href= '/system/html/userSettings.html' ;
});


socket.on('fotoAgg',function(data)
{
	if(data!=null && data!='vuota')
	{
		$('#img').attr('src',data);
	}

	$('#caricamentoIndex').hide();
	$('#userSett').show();
	$('.togli').removeClass('active');
});

socket.on('mandaProdotti',function(data)
{
	var tipi=new Array();
	for (var i = 0; i < data.length; i++) {
		tipi.push(data[i].tipo2);
	}
	var uniqueNames = [];
	$.each(tipi, function(i, el){
		if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	$('#menu1').html("");
	$('#menu2').html("");
	$('#menu3').html("");
	prodotti=data;
	for (var i = 0; i < uniqueNames.length; i++) {
		$('#menu1').append($('<div class="item" data-value='+""+uniqueNames[i]+"'"+'>'+uniqueNames[i]+'</div>'));
		$('#menu2').append($('<div class="item" data-value='+""+uniqueNames[i]+"'"+'>'+uniqueNames[i]+'</div>'));
		$('#menu3').append($('<div class="item" data-value='+""+uniqueNames[i]+"'"+'>'+uniqueNames[i]+'</div>'));
	}
	$('#drop1').val(uniqueNames[0]);
	$('#drop1').change();
	$('#drop2').val(uniqueNames[1]);
	$('#drop2').change();

	$('#drop3').val(uniqueNames[2]);
	$('#drop3').change();


	//-----------------------------------------------------------------------------------------------------------
});

socket.on('accessoAdmin',function(data)
{
	window.location="/system/html/adminPage.html";
});



}); 	


socket.on('noReg',function(data)
{
	if(data[0]=="benvenuto")
	{
		$('#utente').text(data[1]);
		document.cookie = "username="+data[1];
		changeView(data[1]);
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

	if(data[0]=="registrazione effettuata con successo")
	{
		alert(data[0]);
		$('.tiny.modal').modal('hide');
		document.cookie="username="+data[1];
		location.reload();
		return;
	}
	
	alert(data[0]);

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
	socket.emit('aggiornaFoto',name);
	$('#test').find("i").removeClass("user circle icon");
	$('#test').find("i").addClass("address card icon");
}
