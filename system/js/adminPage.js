var ip='192.168.10.104';
var socket = io.connect(ip+":4200")
var indice = 0;
$(document).ready(function()
{
	$('.ui.dropdown')
	.dropdown();
	$('#add').on('click',function()
	{
		$('#corpo').append($('<tr class="ui fluid form"><td><input id="nome'+indice+'" type="text" placeholder="Dai"></td><td><input id="tipo'+indice+'" type="text" placeholder="Tommy"></td><td><input id="tipo2'+indice+'" type="text" placeholder="ce"></td><td><input id="recensione'+indice+'" type="text" placeholder="la"></td><td><input id="prezzo'+indice+'" type="text" placeholder="facciamo"></td><td><input id="immagine'+indice+'" type="text" placeholder="ziochen"></td></tr>'));
		indice++;
	});

	$('#save').click(function()
	{
		var prodotti = [];
		
		for(let i = 0; i<indice; i++)
		{

			if($('#nome'+i).val() != "" && $('#tipo'+i).val() != "" && $('#tipo2'+i).val() != "" && $('#recensione'+i).val() != "" &&$('#prezzo'+i).val() != "" && $('#immagine'+i).val() != "" )
			{
				if($('#nome'+i).val() == "" || $('#tipo'+i).val()  == "" || $('#tipo2'+i).val() == "" || $('#recensione'+i).val()  == "" || $('#prezzo'+i).val()  == "" || $('#immagine'+i).val()  == "" )
				{
										alert("riempi tutti i campi")
 	
				}
				else{
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
			}
		}
		socket.emit('aggiungiProdotti',prodotti);
	});
});
