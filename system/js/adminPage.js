var ip='192.168.1.3';
var socket = io.connect(ip+":4200")
var indice = 0;
var indice2=0;
var indiceNuovo =0;
var prodotti =[];
var prodottiAggiornati=[];
var vecchiProdotti = []
$(document).ready(function()
{
	var x = document.cookie;
	if(x != "")
	{
		$('#drop1').val(x);
		$('#filtra').trigger( "click" );
	}

	socket.emit('caricato','si');
	$('#filtra').on('click',function()
	{
		document.cookie = $('#drop1').val();
		daEliminare = [];
		indice = 0;
		indice2 =0;
		vecchiProdotti=[];
		$('#corpo').html("");

		if($('#drop1').val()==""||$('#drop1').val()==null||$('#drop1').val()=='default')
		{
			alert('nessun tipo selezionato');
		}

		if($('#drop2').val()==""||$('#drop2').val()==null||$('#drop2').val()=='default')
		{
			for (var i = 0; i < prodotti.length; i++) {
				if(prodotti[i].tipo==$('#drop1').val())
				{
					vecchiProdotti.push(prodotti[i].nome);
					$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice2+'" type="text" value="'+prodotti[i].nome+'"></td><td><input id="tipo1'+indice2+'" type="text" value="'+prodotti[i].tipo+'"></td><td><input id="tipo2'+indice2+'" type="text" value="'+prodotti[i].tipo2+'"></td><td><input id="recensione'+indice2+'" type="text" value="'+prodotti[i].recensione+'"></td><td><input id="prezzo'+indice2+'" type="text" value="'+prodotti[i].prezzo+'"></td><td><input id="immagine'+indice2+'" type="text" value="'+prodotti[i].immagine+'"></td><td><div class="ui fitted checkbox"><input type = "checkbox" id="check'+indice2+'" name="check'+indice2+'"><label></label></div></td></tr>'));
					indice2=indice2+1;;
					indice = indice +1;;
				}

			}
		}
		else
		{
			for (var i = 0; i < prodotti.length; i++) {
				if(prodotti[i].tipo2==$('#drop2').val())
				{
					vecchiProdotti.push(prodotti[i].nome);
					$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice2+'" type="text" value="'+prodotti[i].nome+'"></td><td><input id="tipo1'+indice2+'" type="text" value="'+prodotti[i].tipo+'"></td><td><input id="tipo2'+indice2+'" type="text" value="'+prodotti[i].tipo2+'"></td><td><input id="recensione'+indice2+'" type="text" value="'+prodotti[i].recensione+'"></td><td><input id="prezzo'+indice2+'" type="text" value="'+prodotti[i].prezzo+'"></td><td><input id="immagine'+indice2+'" type="text" value="'+prodotti[i].immagine+'"></td></td><td><div class="ui fitted checkbox"><input type = "checkbox" id="check'+indice2+'" name="check'+indice2+'"><label></label></div></td></tr>'));
					indice2=indice2+1;;
					indice = indice +1;
				}
			}
		}
	});

	$('#drop1').on('change',function()
	{
		$('#menu2').html("");
		var type=$('#drop1').val();

		var tipi=new Array();
		for (var i = 0; i < prodotti.length; i++) {
			
			if(type==prodotti[i].tipo)
			{
				tipi.push(prodotti[i].tipo2);
			}
		}
		var uniqueNames = [];
		$.each(tipi, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});


		for (var i = 0; i < uniqueNames.length; i++) {
			$('#menu2').append($('<div class="item" data-value="'+uniqueNames[i]+'">'+uniqueNames[i]+'</div>'));
		}


	});


	$('.ui.dropdown')
	.dropdown();
	$('#add').on('click',function()
	{
		$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice+'" type="text" placeholder="nome"></td><td><input id="tipo1'+indice+'" type="text" value="'+$('#drop1').val()+'"></td><td><input id="tipo2'+indice+'" type="text" placeholder="tipo2"></td><td><input id="recensione'+indice+'" type="text" placeholder="recensione"></td><td><input id="prezzo'+indice+'" type="text" placeholder="prezzo"></td><td><input id="immagine'+indice+'" type="text" placeholder="immagine"></td><td><div class="ui fitted checkbox"><input type = "checkbox" id="check'+indice+'" name="h"><label></label></div></td></tr>'));
		indice = indice+1;
		indiceNuovo++;
	});

	$('#conferma').click(function()
	{
		var prodotti = [];
		var prodottiAggiornati=[];
		daEliminare = [];
		for(let i = 0; i<indice; i++)
		{
			if($('#nome'+i).val() != "" && $('#tipo1'+i).val() != "" && $('#tipo2'+i).val() != "" && $('#recensione'+i).val() != "" &&$('#prezzo'+i).val() != "" && $('#immagine'+i).val() != "" )
			{
				if($('#nome'+i).val() != "" || $('#tipo1'+i).val()  != "" || $('#tipo2'+i).val() != "" || $('#recensione'+i).val()  != "" || $('#prezzo'+i).val()  != "" || $('#immagine'+i).val()  != "" )
				{
					if(vecchiProdotti[i] != null)
					{
						var nuovoOggetto = 
						{
							"vecchio" : vecchiProdotti[i],
							"nome" : $('#nome'+i).val(),
							"tipo" : $('#tipo1'+i).val(),
							"tipo2" : $('#tipo2'+i).val(),
							"recensione" : $('#recensione'+i).val(),
							"prezzo" : $('#prezzo'+i).val(),
							"immagine" : $('#immagine'+i).val()
						}
					}
					else
					{
						var nuovoOggetto = 
						{
							"vecchio" : $('#nome'+i).val(),
							"nome" : $('#nome'+i).val(),
							"tipo" : $('#tipo1'+i).val(),
							"tipo2" : $('#tipo2'+i).val(),
							"recensione" : $('#recensione'+i).val(),
							"prezzo" : $('#prezzo'+i).val(),
							"immagine" : $('#immagine'+i).val()
						}
					}

					prodotti.push(nuovoOggetto);
					prodottiAggiornati.push(nuovoOggetto)
					
					if( document.getElementById("check"+i).checked == false){;} else {daEliminare.push(nuovoOggetto)}
				}
				else{
					alert("riempi tutti i campi")
				}
			}
		}

	/*	for (var i = 0; i < prodottiAggiornati.length; i++) {
			alert(prodottiAggiornati[i].vecchio+ ", "+ prodottiAggiornati[i].nome +", "+prodottiAggiornati[i].tipo +", "+ prodottiAggiornati[i].tipo2 +", "+prodottiAggiornati[i].recensione +", "+prodottiAggiornati[i].prezzo +", "+prodottiAggiornati[i].immagine)
		}*/

		socket.emit('aggiornaProdotti',prodottiAggiornati);
		socket.emit('elimina', daEliminare);
		location.reload();
	});

	socket.on('prodottoEsistente',function(data)
	{
		alert('il prodotto: '+data+' è gia presente nel database');
	});


	socket.on('caricaRow',function(data)
	{
		prodotti=data;
	});


});




