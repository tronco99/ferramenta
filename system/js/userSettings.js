var ip='192.168.10.114';
var socket = io.connect(ip+":4200");
var x=0;


$(document).ready(function()
{
	
	$('#modificaFoto').hide();

	$('#inp').hide();

	$("#name").text(document.cookie.replace('username=','').toUpperCase());
	socket.emit('richiestaDati',document.cookie.replace('username=',''));
	socket.emit('aggiornaFoto',document.cookie.replace('username=',''));
	$('#home').on('click',function()
	{
		document.location.href="/";
	});

	$('.ui .dimmer')
	.dimmer({
		on: 'hover'
	})
	;

	$('#modificaFoto').click(function()
	{
		$('#inp').trigger('click');
	});


	$('#annulla').click(function(){
		socket.emit('richiestaDati',document.cookie.replace('username=',''));
	});

	$('#confermaCambio').click(function()
	{
		$('.ui.basic.modal')
		.modal({
			closable  : false,
			onDeny    : function(){
			},
			onApprove : function() {
				if($('#password3').val() == $('#confermaPassword3').val())
				{
					socket.emit('aggiornaDati',new Array(document.cookie.replace('username=',''),$("#indirizzo3").val(),$("#città3").val(),$("#cap3").val(),$("#nickname3").val(),$("#email3").val(),$("#password3").val(),$("#confermaPassword3").val(), x));
					return;
				}
				alert('le password non coincidono');
			}
		})
		.modal('show')
		;

	});

	socket.on('fotoAgg',function(data)
	{
		$('#pro').hover(function(){
			$('#caricamento').hide();
		});
		if(data!=null && data!='vuota')
		{
			$('#profilo').attr('src',data);
		}
		$('#caricamento').hide();
		$('#modificaFoto').show();
		$('.togli').removeClass('active');
	});


	socket.on('riceviDatiVecchi',function(data)
	{
		$("#indirizzo3").val(data[0]);
		$("#città3").val(data[1]);
		$("#cap3").val(data[2]);
		$("#nickname3").val(data[3]);
		$("#email3").val(data[4]);
		$("#password3").val(data[5]);
		$("#confermaPassword3").val(data[6]);
	});

	socket.on('updateNick',function(data)
	{
		document.cookie= "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		document.cookie = "username="+data+"; path=/";
		document.location.href="/";
	});



	$('#inp').on('change',function()
	{
		readFile();
	});
});

function readFile() {

	if ($('#inp')[0].files && $('#inp')[0].files[0]) {

		var FR= new FileReader();

		FR.addEventListener("load", function(e) {

			x=e.target.result;
			var src = x;
			$('#profilo').attr('src',src);
		}); 

		FR.readAsDataURL( $('#inp')[0].files[0] );
	}

}
