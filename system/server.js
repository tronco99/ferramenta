var ip='192.168.1.13';
var porta=4200;
var control=0;
var regEm = /([\w-\.]+)@[a-z]+.[a-z]+/i; 
var regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
var fs = require('fs'); 
var realm2=0;
var realm3 = 0;


var Realm = require('realm');
const RegistrationSchema = {
	name: 'Database',
	properties: {
		nome:     'string',
		indirizzo: 'string',
		città:     'string',
		cap:     'string',
		nickname: 'string',
		email: 'string',
		password: 'string',
		password2:     'string',
	}
};
var nuovaVariabile = "ciao" 

const ProductSchema = {
	name: 'Productdb',
	properties: {
		nome:     'string',
		tipo: 'string',
		tipo2: 'string',
		recensione:'string',
		prezzo: 'string',
		immagine:'string'
	}
};
const ValutationSchema = {
	name: 'Valutationdb',
	properties: {
		nickname:     'string',
		tipo: 'string',
		nome: 'string',
		recensione:'string',
		valutazione:'string'
	}
};


var realm=new Realm({schema:[RegistrationSchema],schemaVersion:9});

var nodemailer = require('nodemailer');
var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );
var path = __dirname;
var verify_path=path.replace('\\system',"");
app.use( express.static(verify_path));
app.get( '/', function ( req, res, next )
{
	res.sendFile( __dirname + '/html/index.html' );

} );

var tuttiProdotti = [];
var uniqueProduct = [];
var prodotti =[];

io.on( 'connection', function ( socket )
{
	socket.on('chiediProdotti',function(data)
	{
		tuttiProdotti = [];
		realm.close();
		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		let result=realm2.objects('Productdb');

		for(let i = 0; i<result.length; i++)
		{
			var nuovoOggetto = {"title": result[i].nome, "tipo": result[i].tipo};
			tuttiProdotti.push(nuovoOggetto);
		}
		socket.emit('mandoTuttiProdotti', tuttiProdotti);
		realm2.close();
	});

	socket.on('chiediValutazioni', function(data)
	{
		//nome data[0], tipo data[1]
	//	console.log(data[0] + ", ssss "+data[1])
	var valutazioni=[];
	var persone =[];
	realm2.close();

	realm3=new Realm({schema:[ValutationSchema],schemaVersion:9});
	let result=realm3.objects('Valutationdb');
	var r=result.filtered('tipo="'+data[1]+'" AND nome="'+data[0]+'"' );
	var recensioni = JSON.parse(JSON.stringify(r));
	var sizeRecensioni = Object.keys(recensioni).length;
	console.log(sizeRecensioni)
	for(let i = 0; i<sizeRecensioni; i++)
	{			
		valutazioni.push(recensioni[i].nickname)
		valutazioni.push(recensioni[i].valutazione)
		valutazioni.push(recensioni[i].recensione)
		fs.readFile("../profile_images/ciao.txt", {encoding: 'utf-8'}, function(err,data){
			console.log(data)
			//	valutazioni.push(data)
		});
		valutazioni.push(recensioni[i].nome)
	}

	//	console.log(valutazioni)
	realm3.close();
	socket.emit('ricevoRecensioni',valutazioni);
});

	socket.on('elimina',function(data)
	{
	/*	for (var i = 0; i < data.length; i++) {
			console.log(data[i].vecchio, data[i].nome +", "+data[i].tipo +", "+ data[i].tipo2 +", "+data[i].recensione +", "+data[i].prezzo +", "+data[i].immagine)
		}*/

		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		var option;
		realm2.write(()=>
		{	
			for (var i = 0; i < data.length; i++) {
				if(data[i].vecchio != "") {
					let test=realm2.objects('Productdb').filtered('nome = "'+data[i].vecchio+'"');
					realm2.delete(test);
				}
			}
		});
		realm2.close();


	});


	socket.on('aggiornaProdotti',function(data)
	{
		// for (var i = 0; i < data.length; i++) {
		// 	console.log(data[i].vecchio, data[i].nome +", "+data[i].tipo +", "+ data[i].tipo2 +", "+data[i].recensione +", "+data[i].prezzo +", "+data[i].immagine)
		// }

		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		var option;
		realm2.write(()=>
		{	
			for (var i = 0; i < data.length; i++) {
				if(data[i].vecchio != "") {
					let test=realm2.objects('Productdb').filtered('nome = "'+data[i].vecchio+'"');
					realm2.delete(test);
				}
			}


			for (var i = 0; i < data.length; i++) {
				realm2.create(ProductSchema.name,{nome:data[i].nome,tipo:data[i].tipo,tipo2:data[i].tipo2,recensione:data[i].recensione,prezzo:data[i].prezzo,immagine:data[i].immagine});
			}		
		});
		realm2.close();

	});


	socket.on('mandaProdotto', function(data)
	{
		var prod =[];
		realm.close();
		delete realm;
		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		let result=realm2.objects('Productdb');
		console.log('controlla: '+ data[1]+ ' e '+data[0])
		var r=result.filtered('tipo="'+data[1]+'" AND nome="'+data[0]+'"' );
	//	r = result.filtered('nome="'+data[0]+'"' );
	
	var a = JSON.parse(JSON.stringify(r));

	if(a[0] != undefined)
		prod.push(a[0].nome, a[0].tipo, a[0].tipo2, a[0].recensione, a[0].prezzo, a[0].immagine)
	else prod.push(null, null, null, null, null, null)


		realm2.close();
	socket.emit('ricevoProdotto', prod)
	prod = [];
})


	socket.on('caricato',function(data)
	{
		var prodotti =[];
		realm.close();
		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		let result=realm2.objects('Productdb');
		var a3 = JSON.parse(JSON.stringify(result));

		var size3 = Object.keys(a3).length;
		
		for(var i = 0; i<size3; i++)
		{
			var nuovoProdotto =
			{
				"nome": a3[i].nome,
				"tipo": a3[i].tipo,
				"tipo2": a3[i].tipo2,
				"recensione": a3[i].recensione,
				"prezzo": a3[i].prezzo,
				"immagine": a3[i].immagine
			}
			prodotti.push(nuovoProdotto);
		}

		realm2.close();

		socket.emit('caricaRow',prodotti);
	});

	socket.on('cambiaDb',function(data)
	{
		realm=new Realm({schema:[RegistrationSchema],schemaVersion:9});
	});

	socket.on('caricaProdotti',function(data)
	{
		var prodotti = [];
		var type=data.toLowerCase();
		realm.close();
		delete realm;
		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		let result=realm2.objects('Productdb');

		var r=result.filtered('tipo="'+type+'"');
		var a = JSON.parse(JSON.stringify(r));

		var size = Object.keys(a).length;
		
		for(var i = 0; i<size; i++)
		{
			var nuovoProdotto =
			{
				"nome": a[i].nome,
				"tipo": a[i].tipo,
				"tipo2": a[i].tipo2,
				"recensione": a[i].recensione,
				"prezzo": a[i].prezzo,
				"immagine": a[i].immagine
			}
			prodotti.push(nuovoProdotto);
		}
		realm2.close();
		// Realm.open({schema: [RegistrationSchema],schemaVersion:9});

		socket.emit('mandaProdotti',prodotti);


	});


	socket.on('aggiungiProdotti',function(data)
	{
		realm.close();
		var prodotti1 = [];
		var prodotti2 = [];
		var prodotti3 = [];
		realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
		let result=realm2.objects('Productdb');
		var a=result.filtered('tipo="interni"');
		var b=result.filtered('tipo="esterni"');
		var c=result.filtered('tipo="aziendali"');
		var a1 = JSON.parse(JSON.stringify(a));
		var a2 = JSON.parse(JSON.stringify(b));
		var a3 = JSON.parse(JSON.stringify(c));
		var size1 = Object.keys(a1).length;
		var size2 = Object.keys(a2).length;
		var size3 = Object.keys(a3).length;

		for(let i = 0; i<size1; i++)
		{
			var nuovoProdotto1 =
			{
				"nome": a[i].nome,
				"tipo": a[i].tipo,
				"tipo2": a[i].tipo2,
				"recensione": a[i].recensione,
				"prezzo": a[i].prezzo,
				"immagine": a[i].immagine
			}
			prodotti1.push(nuovoProdotto1);
		}
		for(let i = 0; i<size2; i++)
		{
			var nuovoProdotto2 =
			{
				"nome": a[i].nome,
				"tipo": a[i].tipo,
				"tipo2": a[i].tipo2,
				"recensione": a[i].recensione,
				"prezzo": a[i].prezzo,
				"immagine": a[i].immagine
			}
			prodotti2.push(nuovoProdotto2);
		}
		for(let i = 0; i<size3; i++)
		{
			var nuovoProdotto3 =
			{
				"nome": a[i].nome,
				"tipo": a[i].tipo,
				"tipo2": a[i].tipo2,
				"recensione": a[i].recensione,
				"prezzo": a[i].prezzo,
				"immagine": a[i].immagine
			}
			prodotti3.push(nuovoProdotto3);
		}

		for(let i = 0; i<data.length; i++)
		{
			if(data[i].tipo == "interni")
			{
				for(let x = 0; x<prodotti1.length; x++)
				{
					if(data[i].nome == prodotti1[i].nome)
					{
						socket.emit('prodottoEsistente',prodotti1[i].nome);
					}
					else
					{

						var option;
						realm2.write(() => 
						{
							option=realm2.create(ProductSchema.name,{nome:data[i].nome, tipo:data[i].tipo, tipo2:data[i].tipo2, recensione:data[i].recensione, prezzo:data[i].prezzo, immagine:data[i].immagine});
						});
						console.log('aggiunto prodotto')

						break;
					}
				}
			}
			else 
			{
				if(data[i].tipo== "esterni")
				{
					for(let x = 0; x<prodotti2.length; x++)
					{
						if(data[i].nome == prodotti2[i].nome)
						{
							socket.emit('prodottoEsistente',prodotti2[i].nome);
						}
						else
						{
							var option;
							realm2.write(() => 
							{
								option=realm2.create(ProductSchema.name,{nome:data[i].nome, tipo:data[i].tipo, tipo2:data[i].tipo2, recensione:data[i].recensione, prezzo:data[i].prezzo, immagine:data[i].immagine});
							});
							console.log('aggiunto prodotto')

							break;
						}
					}
				}
				else
				{
					if(data[i].tipo== "aziendali")
					{
						for(let x = 0; x<prodotti3.length; x++)
						{
							if(data[i].nome == prodotti3[i].nome)
							{
								socket.emit('prodottoEsistente',prodotti3[i].nome);
							}
							else
							{
								var option;
								realm2.write(() => 
								{
									option=realm2.create(ProductSchema.name,{nome:data[i].nome, tipo:data[i].tipo, tipo2:data[i].tipo2, recensione:data[i].recensione, prezzo:data[i].prezzo, immagine:data[i].immagine});
								});
								console.log('aggiunto prodotto')

								break;
							}
						}
					}
				}
			}
		}

		
	});



	socket.on('registrazione',function(data)  //controllo su nickname(indice4) e email(indice5)
	{


		var controllaReg = verify(data,socket);
		if(controllaReg==0)
		{
			control=0;
			for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
			{
				if(realm.objects(RegistrationSchema.name)[i].nickname==data[4])
				{
					control=1
					socket.emit('noReg','il nickname esiste già,riprova');
					break;
				}
				if(realm.objects(RegistrationSchema.name)[i].email==data[5])
				{
					control=1;
					socket.emit('noReg','email già esistente, riprovare');
					break;
				}

			};



	if(control==0) //controlla registrazione 
	{
		var option;
		realm.write(() => 
		{
			option=realm.create(RegistrationSchema.name,{nome:data[0],indirizzo:data[1],città:data[2],cap:data[3],nickname:data[4],email:data[5],password:data[6],password2:data[7]});
			
			socket.emit('noReg',new Array("registrazione effettuata con successo",data[4]));
		});

	}
}

});
	socket.on('accedi',function(data)
	{
		console.log(data)
		if(data[0]=='admin')
		{
			if(data[1]=='password')
			{
				socket.emit('accessoAdmin','string');
				return;
			}
		}
		var esistente = 0;
		for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
		{
			if(realm.objects(RegistrationSchema.name)[i].email==data[0] || realm.objects(RegistrationSchema.name)[i].nickname==data[0])
			{
				esistente ++;
				if(realm.objects(RegistrationSchema.name)[i].password==data[1])
				{
					socket.emit('noReg',new Array('benvenuto',realm.objects(RegistrationSchema.name)[i].nickname));				
				}
				else 
				{
					socket.emit('noReg',new Array('password invalida'));
				}
			}

		}
		if(esistente == 0)
		{
			socket.emit('noReg',new Array('account inesistente'));
		}

	});

	socket.on('richiestaDati',function(data)
	{	
		var dati;
		var realm=new Realm({schema:[RegistrationSchema],schemaVersion:9});
    	for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
		{
			if(realm.objects(RegistrationSchema.name)[i].nickname==data)
			{
				dati = new Array(realm.objects(RegistrationSchema.name)[i].indirizzo, realm.objects(RegistrationSchema.name)[i].città, realm.objects(RegistrationSchema.name)[i].cap,realm.objects(RegistrationSchema.name)[i].nickname, realm.objects(RegistrationSchema.name)[i].email, realm.objects(RegistrationSchema.name)[i].password, realm.objects(RegistrationSchema.name)[i].password2);
			}
		}
		socket.emit('riceviDatiVecchi',dati);	
	});

	socket.on('aggiornaDati',function(data)
	{
		var realm=new Realm({schema:[RegistrationSchema],schemaVersion:9});

		for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
		{
			if(realm.objects(RegistrationSchema.name)[i].nickname==data[0])
			{
				if(data[8] != "")
				{
					fs.writeFile("./ferramenta/profile_images/"+data[0]+".txt", data[8], function(err){
						if (err) 
						{
							return console.log(err);
						}
						console.log('Sanata');
					});

					var help=realm.objects(RegistrationSchema.name)[i].nome;
					realm.write(() => 
					{
						let result=realm.objects(RegistrationSchema.name);
						let r=result.filtered('nickname = "'+data[0]+'"');
						realm.delete(r);
						option=realm.create(RegistrationSchema.name,{nome:help,indirizzo:data[1],città:data[2],cap:data[3],nickname:data[4],email:data[5],password:data[6],password2:data[7]});
						socket.emit('updateNick',data[4]);

					});
					realm.close();
					break;
				}
				else
				{
					var help=realm.objects(RegistrationSchema.name)[i].nome;
					realm.write(() => 
					{
						let result=realm.objects(RegistrationSchema.name);
						let r=result.filtered('nickname = "'+data[0]+'"');
						realm.delete(r);
						option=realm.create(RegistrationSchema.name,{nome:help,indirizzo:data[1],città:data[2],cap:data[3],nickname:data[4],email:data[5],password:data[6],password2:data[7]});
						socket.emit('updateNick',data[4]);

					});
					break;
				}

			}
		}

	});

	socket.on('aggiornaFoto',function(data)
	{
		fs.readFile('./ferramenta/profile_images/'+data+'.txt', {encoding: 'utf-8'}, function(err,no){
			socket.emit('fotoAgg',no); 
		});
	});

	socket.on('chiediFoto', function(data)
	{
		var profilo = [];
		console.log('RICEVO: '+data)
		fs.readFile('./ferramenta/profile_images/'+data+'.txt', {encoding: 'utf-8'}, function(err,no){

			profilo.push(data);
			profilo.push(no);
			socket.emit('mandoFoto',profilo); 
		});
	});

	socket.on('inviaCommento', function(data){
		realm2.close();
		realm3.close();
		realm.close();
		delete realm;
		delete realm2;
		delete realm3;

		realm3=new Realm({schema:[ValutationSchema],schemaVersion:9});
		let result=realm3.objects('Valutationdb');
		
		var option;
		realm3.write(() => 
		{
			option=realm3.create(ValutationSchema.name,{nickname:data[0], tipo:data[1], nome:data[2], recensione:data[3], valutazione:data[4]+""});
		});
		realm3.close();

		var inviaDatiCommento = [];
		fs.readFile('./ferramenta/profile_images/'+data[0]+'.txt', {encoding: 'utf-8'}, function(err,no){
			inviaDatiCommento.push(data[0]);
			inviaDatiCommento.push(no);
			inviaDatiCommento.push(data[3]);
			inviaDatiCommento.push(data[4]);
			
			inviaDatiCommento.push(data[1]);
			inviaDatiCommento.push(data[2]);

			socket.broadcast.emit('inviaNuovoCommento',inviaDatiCommento); 
			socket.emit('inviaNuovoCommento',inviaDatiCommento); 

		});
	});
});



server.listen( porta, function ()
{
	console.log(ip+':'+porta);
} );


function verify(data,socket)
{
	for (var i = 0; i < data.length; i++) {
		if(data[i] == "")
		{
			socket.emit('formatoInvalido','5');
			break;
		}
	}
	var passa=0;
	var email=data[5];
	var password=data[6];
	var conf_password=data[7];
	var nickname = data[4];
	var result_email = regEm.test(email);
	var result_password = regPass.test(password);

	if (result_email==false)
	{
		socket.emit('formatoInvalido','1');
		passa+=1;
	}

	if(result_password==false)
	{
		socket.emit('formatoInvalido','2');
		passa+=1;
	}

	if(password != conf_password)
	{
		socket.emit('formatoInvalido','3');
		passa+=1;
	}


	if(nickname.includes("@"))
	{
		socket.emit('formatoInvalido','4');
		passa+=1;
	}

	return passa;
}
