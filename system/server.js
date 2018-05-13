var ip='10.0.0.3';
var porta=4200;
var control=0;
var regEm = /([\w-\.]+)@[a-z]+.[a-z]+/i; 
var regPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/i;
var fs = require('fs'); 



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
//var realm3=new Realm({schema:[ValutationSchema],schemaVersion:9});
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


var prodotti =[];

io.on( 'connection', function ( socket )
{
	socket.on('caricaProdotti',function(data)
	{
		prodotti = [];
		var type=data.toLowerCase();
		realm.close();
		var realm2=new Realm({schema:[ProductSchema],schemaVersion:9});
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

		socket.emit('mandaProdotti',prodotti);


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
		for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
		{
			if(realm.objects(RegistrationSchema.name)[i].nickname==data[0])
			{
				if(data[8] != "")
				{
					fs.writeFile("../profile_images/"+data[0]+".txt", data[8], function(err){
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
		fs.readFile("../profile_images/"+data+".txt", {encoding: 'utf-8'}, function(err,data){
			socket.emit('fotoAgg',data); 
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





