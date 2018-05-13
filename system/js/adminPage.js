var ip='10.0.0.3';
var socket = io.connect(ip+":4200");

$(document).ready(function()
{
$('.ui.dropdown')
  .dropdown();
  $('#add').on('click',function()
  {
  	$('#1riga').append($('<td>zanca</td><td>dai</td><td>che</td><td>ce</td><td>la</td><td>facciamo</td>'));
  });
});
