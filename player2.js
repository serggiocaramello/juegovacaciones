/* Auxiliar */
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
}
NodeList.prototype.__proto__ = Array.prototype;

/* Aviso salir */
/* window.onbeforeunload = function () {
    return "¿Estás seguro?, si haces esto te vas a salir de la partida";
}; */


/* Constantes */
const socket = io('ws://localhost:8080');
let direccionReloj = true;
let nextTurno = (direccionReloj == true) ? 2 : 4;
let saltoTurno = 3;
let cartaPozo = [];
const idJugador = 2;
const avatar = "2.jpg";
let manoJugador = [];
let penalizador = 0;
let estadoDenunciable = false;
let estadoUno = false;
let cartaJugada = '';



/* Métodos Principales */


socket.on('inicioTurno', turno => {
    if (turno == 1) {
        console.log('te toca jugar')
    } else {
        console.log('juega ' + turno)
    }
});



/* Lógica de Juego */

/* Lógica Primer Turno */


function jugadaInicial() {
    pidocarta(); /* Carta del server */
    cartaPozo(); /* Representación Gráfica */
    switch (cartaPozo) {
        case cartaPozo == '+2':
            pidocarta();
            pidocarta();
            finTurno();
            break;
        case cartaPozo == '+4':
            devolver4();
            jugadaInicial();
            break;
        case cartaPozo == 'V':
            finTurno('V');
            break;
        case cartaPozo == 'SK':
            finTurno('SK');
            break;
        case cartaPozo == 'WD':
            elegirColor();
            jugarTurno();
            break;
        default:
            jugarTurno();
    }
}

/* Lógica Jugar Turno */

function jugarTurno() {
    contadorTiempo();
}






/* Lógica cuando es mi turno */
/* function inicioTurno() {
    console.log("turno iniciado")
    robarcarta()
    jugarcarta()
} */

/* Lógica cuando es el turno de otro jugador */
/* function mostrarTurno() {
    console.log("otro turno iniciado")
    mostrarJuegoOponente()
} */










/* Métodos Auxiliares */





/* Playground */

const test7 = $('.test7').onclick = () => {
    usuario = 2;
    socket.emit('usuario', usuario);
}



/* Actualizar Turno */

/* Emisiones */

/* 1.- Emitir turno de juego */
const test1 = $('.test1').onclick = () => {
    turno = $('#test-input').value
    socket.emit('inicioTurno', turno);
}

/* 2.- Emitir Carta Jugada */

const test2 = $('.test2').onclick = () => {
    cartaJugada = '3v';
    socket.emit('emitirCartaJugada', cartaJugada);
}

/* 3.- Emitir UNO */

const test3 = $('.test3').onclick = () => {
    estadoUno = true;
    socket.emit('emitirUno', estadoUno);
}


/* 4.- Emitir Denuncia */

const test4 = $('.test4').onclick = () => {
    estadoDenunciable = true;
    socket.emit('emitirEstadoDenunciable', estadoDenunciable);
    return estadoDenunciable
}

/* 5.- Emitir Victoria */

const test5 = $('.test5').onclick = () => {
    socket.emit('emitirVictoria', idJugador);
    return
}

/* 6.- Emitir Robo de Carta */


/* Recepciones */

/* 1.- Actualizar turno de juego */

/* socket.on("actualizarTurno", valor => {
    turno = valor
    if (turno == 1) {
        inicioTurno();
    } else {
        mostrarTurno();
    }
    return turno
}); */

/* 2.- Actualizar carta Jugada */

socket.on("actualizarCartaJugada", cartaJugada => {
    cartaJugada = cartaJugada;
    $('.pozo').append(cartaJugada);
});

/* 3.- Actualizar Uno */

socket.on("actualizarUno", estadoUno => {
    estadoUno = estadoUno
    $('.pozo').append('queda uno');
});


/* 4.- Actualizar Estado Denunciable */

socket.on("actualizarEstadoDenunciable", estadoDenunciable => {
    estadoDenunciable = estadoDenunciable
    $('.pozo').append('Denunciado');
});

/* 5.- Actualizar Victoria */

socket.on("actualizarEstadoVictoria", idJugador => {

    $('.pozo').append('Ganó: ' + idJugador);
});