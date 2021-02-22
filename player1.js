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
const socket = io('ws://localhost:4000');
let direccionReloj = true;
let nextTurno = (direccionReloj == true) ? 2 : 4;
let saltoTurno = 3;
let cartaPozo = [];
const idJugador = 1;
const avatar = "1.jpg";
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



async function jugadaInicial() {

    try {
        const a = reparticionCartas(7, 0.01);
        mazoCartas = [
            "2g"
        ];
        const c = carta.primeraCartaPozo();
        jugador1.seleccionarCarta(turno)
        ++turno
        jugador1.seleccionarCarta(turno)





    }

    catch (e) {

    }
}





function comprobar() {
    if (carta.cartaPozo == "3R") {
        reparticionCartas(2, 0.3);
    } else {
        console.log("es invalida")
    }
}

/* Lógica Jugar Turno */







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
}
 */









/* Métodos Auxiliares */





/* Playground */

socket.on("mazoInicial", deck1 => {
    console.log(deck1)
    mazoCartas = deck1
    /* $('.pozo').append(cartaJugada); */
});

function pedirMazo() {
    jugador = 1;
    socket.emit('pedirMazo', jugador);
}

pedirMazo()
setTimeout((() => { jugadaInicial() }), 2000);

const test7 = $('.test7').onclick = () => {
    usuario = 1;
    socket.emit('usuario', usuario);
}



/* Actualizar Turno */

/* Emisiones */

/* 1.- Emitir turno de juego */

function inicioTurno() { socket.emit('inicioTurno', 2); }

function cambiarTurno() {
    console.log("cambio turno y robaste2")
    socket.emit('cambiarTurno', turno)
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

/* 1.- Actualizar turno de juego  */

socket.on("actualizarTurno", valor => {
    turno = valor;
    console.log("el nuevo turno es")
    return turno
});

/* 2.- Actualizar carta Jugada */

socket.on("actualizarCartaJugada", cartaJugada => {
    carta.cartaPozo = cartaJugada;
    console.log(cartaJugada)
    /* $('.pozo').append(cartaJugada); */
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


