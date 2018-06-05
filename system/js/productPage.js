var ip = '192.168.10.111';
var socket = io.connect(ip + ":4200")
var prodotto = [];

$(document).ready(function () {

/*   
    $("#rateYo").rateYo({
		rating: 0,
		halfStar: true,
		starWidth: "25px",

		onSet: function (rating, rateYoInstance) {

			alert('zanca è bueo: '+ rating+'/5');
				$('#recensione').show();


		}
	});
 */
    $('#recensione').hide();
    
    var x = document.cookie;
    var y = document.cookie;
    x = x.replace('interni', '');
    x = x.replace(';', '');
    x = x.replace('username=', '');

    $('#userSett').hide();
    if (x != "") {
        changeView(x);
        $('#utente').text(x);
        $('.tiny.modal').modal('hide');
        $('#test')
            .popup({
                on: 'click',
                popup: '#popup',
                position: 'bottom center',
                target: '#test',
                hideOnScroll: 'false'
            });
        }


        $("#logOut").on('click', function () {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            location.reload();   
        });



        $("#tabLog").keypress(function (e) {
            if (e.which == 13) {
                $('#confirm').click();
            }
        });

        $('html').on('click', function () {
            $('#carrello').removeClass('active');
            $('#test').removeClass('active');
        });

        $('.ui .item').on('click', function () {
            $('.ui .item').removeClass('active');
            $(this).addClass('active');
        });

        $('#openMenu').on('click', function () {
            $('.ui.labeled.icon.sidebar').sidebar('toggle');
        });
        $('#carrello').on('click', function () {
            alert('classe')
        });

        $('#test').on('click', function () {
            var classe = $('#icona').attr("class");
                if (classe == 'user circle icon') {
                socket.emit('cambiaDb', 'qualsiasi');
                $('#test').popup('hide');
                $('#emailField').removeClass('field error');
                $('#emailField').addClass('field');
                $('#passwordField').removeClass('field error');
                $('#passwordField').addClass('field');
                $('#confirmPasswordfield').removeClass('field error');
                $('#confirmPasswordfield').addClass('field');
                $('#nicknameField').removeClass('field error');
                $('#nicknameField').addClass('field');
                $('#second').hide();
                $('#first').show();
                $('.tiny.modal')
                    .modal({
                        closable: true,
                        onDeny: function () {
                            return false;
                        }
                    })
                    .modal('show')
                    ;
                $("#accedi").addClass('active');
                $('#confirm').html('accedi');
            }
        });

        $('#accedi').on('click', function () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $('#tabLog').css('width', '70%');
                $('.field').css('width', 'auto');
    
            }
            $('#second').hide();
            $('#first').show();
            $('#confirm').html('accedi');
    
        });
    
        $('#registrati').on('click', function () {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $('#tabLog').css('width', 'auto');
                $('.field').css('width', '50%');
            }
    
            $('#first').hide();
            $('#second').show();
            $('#confirm').html('registrati');
    
        });
    
        $('#confirm').on('click', function () {
            if ($('#confirm').text() == 'registrati') {
                var toDb = new Array($('#nome').val(), $('#indirizzo').val(), $('#città').val(), $('#cap').val(), $('#nick').val(), $('#email').val(), $('#password').val(), $('#password2').val());
                socket.emit('registrazione', toDb);
            }
            else {
                var login = new Array($('#existmail').val(), $('#existpassword').val());
                socket.emit('accedi', login);
            }
    
        });
    
        $('#home').click(function()
        {
            document.location.href="/";
        })

        $('#nickname').on('change', function () {
            var veryControlled = $('#nicknameField').attr('class');
            $('#nicknameField').removeClass(veryControlled);
            $('#nicknameField').addClass('field')
        });
        $('#email').on('change', function () {
            var veryControlled = $('#emailField').attr('class');
            $('#emailField').removeClass(veryControlled);
            $('#emailField').addClass('field')
        });
        $('#password').on('change', function () {
            var veryControlled = $('#passwordField').attr('class');
            $('#passwordField').removeClass(veryControlled);
            $('#passwordField').addClass('field')
    
        });
        $('#password2').on('change', function () {
            var veryControlled = $('#confirmPasswordfield').attr('class');
            $('#confirmPasswordfield').removeClass(veryControlled);
            $('#confirmPasswordfield').addClass('field')
        });
    
        $('#userSett').on('click', function () {
            window.location.href = '/system/html/userSettings.html';
        });

        
        $('#confirm').on('click', function () {
            if ($('#confirm').text() == 'registrati') {
                var toDb = new Array($('#nome').val(), $('#indirizzo').val(), $('#città').val(), $('#cap').val(), $('#nick').val(), $('#email').val(), $('#password').val(), $('#password2').val());
                socket.emit('registrazione', toDb);
            }
            else {
                var login = new Array($('#existmail').val(), $('#existpassword').val());
                socket.emit('accedi', login);
                
            }
    
        });

        socket.on('noReg', function (data) {
            if (data[0] == "benvenuto") {
                $('#utente').text(data[1]);
                document.cookie = "username=" + data[1]+" path='/'";
                document.cookie = "username=" + data[1];
                changeView(data[1]);
                $('.tiny.modal').modal('hide');
                $('#test')
                    .popup({
                        on: 'click',
                        popup: '#popup',
                        position: 'bottom center',
                        target: '#test',
                        hideOnScroll: 'false'
                    });
                return;
            }
        
            if (data[0] == "registrazione effettuata con successo") {
                alert(data[0]);
                $('.tiny.modal').modal('hide');
                document.cookie = "username=" + data[1];
                location.reload();
                return;
            }
        
            alert(data[0]);
        
        });
        

  

//SE MI LOGGO DALL'INDEX FUNZIONA OVUNQUE, SE MI LOGGO DA PRODUCT PAGE, NON VA SULLA PAGINA INIZIALE


    var url = new URL(window.location.href);
    var nomeProdotto = url.searchParams.get("nome");
    var tipo = url.searchParams.get("tipo");

    prodotto.push(nomeProdotto);
    prodotto.push(tipo);
    
    socket.emit("mandaProdotto", prodotto)
    socket.on('ricevoProdotto', function(data)
    {
        //a[0] = nome, a[1] = tipo, a[2] = tipo2, a[3] = recensione, a[4] =prezzo, a[5] =immagine)
        if(data[0] != null)
        {
            alert('esiste')
        }
        else alert('sfigà')
    });

    socket.on("CONTROLLATI", data)
    {
        if (data == true) {
            $('#nomeProdotto').text(prodotto[0])
        }
    } 
    
    
});


function changeView(a) {
    name = a.replace('benvenuto ', '');
    socket.emit('aggiornaFoto', name);
    $('#test').find("i").removeClass("user circle icon");
    $('#test').find("i").addClass("address card icon");
    var classe = $('#icona').attr("class");

}