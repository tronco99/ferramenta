var ip='192.168.1.218';
var socket = io.connect(ip+":4200")
var indice = 0;
var indice2=0;
var prodotti =[];

$(document).ready(function()
{
		socket.emit('caricato','si');

	$('#filtra').on('click',function()
	{
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
						$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice2+'" type="text" value="'+prodotti[i].nome+'"></td><td><input id="tipo'+indice2+'" type="text" value="'+prodotti[i].tipo+'"></td><td><input id="tipo2'+indice2+'" type="text" value="'+prodotti[i].tipo2+'"></td><td><input id="recensione'+indice2+'" type="text" value="'+prodotti[i].recensione+'"></td><td><input id="prezzo'+indice2+'" type="text" value="'+prodotti[i].prezzo+'"></td><td><input id="immagine'+indice2+'" type="text" value="'+prodotti[i].immagine+'"></td><td><div class="ui fitted checkbox"><input type = "checkbox" name="h"><label></label></div></td></tr>'));
						indice2++;
					}

				}
			}
			else
			{
				for (var i = 0; i < prodotti.length; i++) {
					if(prodotti[i].tipo2==$('#drop2').val())
					{
						$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice2+'" type="text" value="'+prodotti[i].nome+'"></td><td><input id="tipo'+indice2+'" type="text" value="'+prodotti[i].tipo+'"></td><td><input id="tipo2'+indice2+'" type="text" value="'+prodotti[i].tipo2+'"></td><td><input id="recensione'+indice2+'" type="text" value="'+prodotti[i].recensione+'"></td><td><input id="prezzo'+indice2+'" type="text" value="'+prodotti[i].prezzo+'"></td><td><input id="immagine'+indice2+'" type="text" value="'+prodotti[i].immagine+'"></td></tr>'));
						indice2++;
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
		$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice+'" type="text" value="nome"></td><td><input id="tipo'+indice+'" type="text" value="tipo"></td><td><input id="tipo2'+indice+'" type="text" value="tipo2"></td><td><input id="recensione'+indice+'" type="text" value="recensione"></td><td><input id="prezzo'+indice+'" type="text" value="prezzo"></td><td><input id="immagine'+indice+'" type="text" value="immagine"></td></tr>'));
		indice++;
	});

	$('#save').click(function()
	{
		var prodotti = [];
		
		for(let i = 0; i<indice; i++)
		{

			if($('#nome'+i).val() != "" && $('#tipo'+i).val() != "" && $('#tipo2'+i).val() != "" && $('#recensione'+i).val() != "" &&$('#prezzo'+i).val() != "" && $('#immagine'+i).val() != "" )
			{
				if($('#nome'+i).val() != "" || $('#tipo'+i).val()  != "" || $('#tipo2'+i).val() != "" || $('#recensione'+i).val()  != "" || $('#prezzo'+i).val()  != "" || $('#immagine'+i).val()  != "" )
				{
					var nuovoOggetto = 
					{
						"nome" : $('#nome'+i).val(),
						"tipo" : $('#tipo'+i).val(),
						"tipo2" : $('#tipo2'+i).val(),
						"recensione" : $('#recensione'+i).val(),
						"prezzo" : $('#prezzo'+i).val(),
						"immagine" : $('#immagine'+i).val()
					}
					prodotti.push(nuovoOggetto);
				}
				else{
					alert("riempi tutti i campi")
				}
			}
		}
		socket.emit('aggiungiProdotti',prodotti);
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




