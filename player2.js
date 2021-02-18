/* Auxiliar */
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
}
NodeList.prototype.__proto__ = Array.prototype;


/* Constantes */
const socket = io('ws://localhost:8080');
let turno = 2;
let direccionReloj = true;
let nextTurno = (direccionReloj == true) ? 3 : 1;
let saltoTurno = 4;
let cartaPozo = [];
const idJugador = 1;
const avatar = "1.jpg";
let manoJugador = [];
let penalizador = 0;
let estadoDenunciable = false;

/* Lógica de Juego */

/* Lógica cuando es mi turno */
function inicioTurno() {
    console.log("turno iniciado")
}

/* Lógica cuando es el turno de otro jugador */
function mostrarTurno() {
    console.log("otro turno iniciado")
}




/* Playground */

document.querySelector('button').onclick = () => {
    text = 'chao';
    turno = 1;
    socket.emit('message', text);

}

/* Sockets */

/* Actualizar Turno */

/* 1.- Emitir turno de juego */
const test1 = $('.test1').onclick = () => {
    turno = $('#test-input').value
    socket.emit('inicioTurno', turno);
}



/* Recepciones */

/* 1.- Actualizar turno de juego */

socket.on("actualizarTurno", valor => {
    turno = valor
    if (turno == 1) {
        inicioTurno();
    } else {
        mostrarTurno();
    }
    return turno
});

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