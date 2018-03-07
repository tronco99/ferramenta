var ip = '192.168.10.112';


var nodemailer = require('nodemailer');

const sqlite3 = require('sqlite3').verbose();
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
    res.sendFile( __dirname + '/index.html' );

} );




io.on( 'connection', function ( socket )
{

	    // socket.on( 'invioTipo', function ( data )
    	// {
    	// 	socket.emit('','')
    	// }
	
});



server.listen( 4200, function ()
{
    console.log( 'server online,porta 4200' );
} );


