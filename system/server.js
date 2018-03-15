var ip='192.168.1.35';
var control=0;

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

var realm=new Realm({schema:[RegistrationSchema],schemaVersion:1})
var nodemailer = require('nodemailer');
var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );
var path = __dirname;
var verify_path=path.replace('\\system',"");
console.log(verify_path);
app.use( express.static(verify_path));
app.get( '/', function ( req, res, next )
{
	res.sendFile( __dirname + '/html/index.html' );

} );




io.on( 'connection', function ( socket )
{

	socket.on('registrazione',function(data)  //controllo su nickname(indice4) e email(indice5)
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
			
			socket.emit('noReg','registrazione effettuata con successo');
		});

	}

});
	socket.on('accedi',function(data)
		{
			for(let i=0; i<realm.objects(RegistrationSchema.name).length;i++)
			{
				if(realm.objects(RegistrationSchema.name)[i].email==data[0])
				{
					if(realm.objects(RegistrationSchema.name)[i].password==data[1])
					{
						socket.emit('noReg','benvenuto'+realm.objects(RegistrationSchema.name)[i].nickname);
					}
					else 
					{
						socket.emit('noReg','password invalida');
					}
				}
				else
				{
					socket.emit('noReg','account inesistente');
				}
		}
	});
});



server.listen( 4200, function ()
{
	console.log( 'server online,porta 4200' );
} );

