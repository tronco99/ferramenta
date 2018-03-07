var ip = '192.168.10.112';


var fs = require( "fs" );
var contents = fs.readFileSync( "./node_modules/aamotoradvisor/database.json" );
var json = JSON.parse( contents );
var content = fs.readFileSync( "./node_modules/aamotoradvisor/login.json" );
var login = JSON.parse(content);
var nodemailer = require('nodemailer');

const sqlite3 = require('sqlite3').verbose();
var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( server );
app.use( express.static( __dirname + '/node_modules' ) );
app.get( '/', function ( req, res, next )
{
    res.sendFile( __dirname + '/node_modules/aamotoradvisor/' + 'firstpage.html' );

} );




io.on( 'connection', function ( socket )
{
	
}



server.listen( 4200, function ()
{
    console.log( 'server online,porta 4200' );
} );