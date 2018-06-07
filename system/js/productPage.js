var ip = '192.168.1.15';
var socket = io.connect(ip + ":4200")
var prodotto = [];
var nomi = [];
var valutazioni = [];
var recensioni = [];
var fotoPersone = [];
var valutazione = 0;
var rate = 0;
var x;

$(document).ready(function () {


    if ($(window).width() < 800) {
        riduci();
        $('#productName').css('font-size', '180%');
    }
    else { ingrandisci(); $('#productName').css('font-size', '250%'); }

    $(window).resize(function () {
        if ($(window).width() < 800) {
            riduci(); $('#productName').css('font-size', '180%');

        }
        else {
            ingrandisci();
            $('#productName').css('font-size', '250%');
        }
    });

    $('#recensione').hide();

    x = document.cookie;
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

    $('#home').click(function () {
        document.location.href = "/";
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
            document.cookie = "username=" + data[1] + " path='/'";
            document.cookie = "username=" + data[1];
            x = data[1];
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

            $('#recensione').show();

            return;
        }

        if (data[0] == "registrazione effettuata con successo") {
            alert(data[0]);
            $('.tiny.modal').modal('hide');
            document.cookie = "username=" + data[1];
            location.reload();
            $('#recensione').show();
            return;
        }

        alert(data[0]);

    });

    var url = new URL(window.location.href);
    var nomeProdotto = url.searchParams.get("nome");
    var tipo = url.searchParams.get("tipo");

    prodotto.push(nomeProdotto);
    prodotto.push(tipo);

    socket.emit("mandaProdotto", prodotto)
    socket.on('ricevoProdotto', function (data) {
        //a[0] = nome, a[1] = tipo, a[2] = tipo2, a[3] = recensione, a[4] =prezzo, a[5] =immagine)
        if (data[0] != null) {
            //aggiorna la pagina con foto, prezzo, descrizione e immagine
            document.getElementById("productImage").src = data[5];
            $('#productDescription').text(data[3]);
            $('#productName').text(data[0].toUpperCase() + " (" + data[2] + ", " + data[1] + ")");
            $('#productPrice').text(data[4] + '€');

            socket.emit('chiediValutazioni', data);
        }
        else window.location.href = '/system/html/404.html'
    });

    $("#rateYo").rateYo({
        rating: 0,
        halfStar: true,
        starWidth: "25px",

        onSet: function (rating, rateYoInstance) {
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
                rate = rating;

            }
            else {
                rate = rating;
            }
        }
    });

    socket.on('ricevoRecensioni', function (data) {
        nomi = [];
        valutazioni = [];
        recensioni = [];
        fotoPersone = [];
        for (let i = 0; i < data.length; i++) {
            nomi.push(data[i]);
            valutazioni.push(data[i + 1]);
            recensioni.push(data[i + 2]);
            socket.emit('chiediFoto', data[i]);
            i = i + 3;
        }

        for (let i = 0; i < valutazioni.length; i++) {
            valutazione = parseInt(valutazione + parseInt(valutazioni[i]));
        }
        valutazione = parseInt(valutazione / parseInt(valutazioni.length)); //LA VALUTAZIONE DA METTERE SULLE STELLE
    });

    var messaggiScritti = [];
    socket.on('mandoFoto', function (data) 
    {
        var vai = true;
        for (let i = 0; i < messaggiScritti.length; i++) 
        {
            if (data[0] == messaggiScritti[i]) 
            {
                vai = false;
            }
        }

        if (vai) 
        {
            for (let i = 0; i < nomi.length; i++) 
            {
                if (data[0] == nomi[i]) 
                {
                    messaggiScritti.push(data[0]);
                    if (data[1] != 'vuota' || data[1] != undefined) 
                    {
                        if (data[1] != null) 
                        {
                            $('#commenti').append('<div class="comment"><a class="avatar"><img id="imma" src="' + data[1] + '"></a><div class="content"<a class="author">' + nomi[i] + '</a><div class="metadata"><div class="date">' + valutazioni[i] + '</div></div><div class="text"><p>' + recensioni[i] + '</p></div></div></div > ');
                        }
                        else 
                        {
                            $('#commenti').append('<div class="comment"><a class="avatar">' + nomi[i].charAt(0).toUpperCase() + '</a><div class="content"<a class="author">' + nomi[i] + '</a><div class="metadata"><div class="date">' + valutazioni[i] + '</div></div><div class="text"><p>' + recensioni[i] + '</p></div></div></div > ');
                        }
                    }
                }
            
            }
        }
        vai = true;

    });

    var commento = [];

    $('#commenta').click(function () {
        commento = [];

        x = x.replace(' ', '');
        commento.push(x);
        commento.push(tipo);
        commento.push(nomeProdotto);
        commento.push($('#commento').val());
        commento.push(rate);

        if ($('#icona').attr("class") == "address card icon") {
            socket.emit('inviaCommento', commento);
            $('#commento').val("")
        }
        
    });

    socket.on('inviaNuovoCommento', function(data)
    {
        if (data[1] != null) 
        {
            $('#commenti').append('<div class="comment"><a class="avatar"><img id="imma" src="' + data[1] + '"></a><div class="content"<a class="author">' + commento[0] + '</a><div class="metadata"><div class="date">' + commento[4] + '</div></div><div class="text"><p>' + commento[3] + '</p></div></div></div > ');
        }
        else 
        {
            $('#commenti').append('<div class="comment"><a class="avatar">' + x.charAt(0).toUpperCase() + '</a><div class="content"<a class="author">' + commento[0] + '</a><div class="metadata"><div class="date">' +  commento[4] + '</div></div><div class="text"><p>' + commento[3] + '</p></div></div></div > ');
        }
    });
});

function changeView(a) {
    name = a.replace('benvenuto ', '');
    socket.emit('aggiornaFoto', name);
    $('#test').find("i").removeClass("user circle icon");
    $('#test').find("i").addClass("address card icon");
    var classe = $('#icona').attr("class");
    $('#recensione').show();
}

function riduci() {
    $('#togli').removeClass('two wide column');
    $('#togli1').removeClass('two wide column');
    $('#ingrandisci').removeClass('six wide column');
    $('#ingrandisci').addClass('eight wide column');
    $('#ingrandisci1').removeClass('six wide column');
    $('#ingrandisci1').addClass('eight wide column');
}

function ingrandisci() {
    $('#togli').addClass('two wide column');
    $('#togli1').addClass('two wide column');
    $('#ingrandisci').removeClass('eight wide column');
    $('#ingrandisci').addClass('six wide column');
    $('#ingrandisci1').removeClass('eight wide column');
    $('#ingrandisci1').addClass('six wide column');
}