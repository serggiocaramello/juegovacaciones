import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import Express from "express";
import { erradicate, deck1, deck2, deck3, deck4 } from "./cards.js";
import _ from "lodash";
import cors from "cors";
import Http from "http";
import * as Io from "socket.io";


const app = Express();
const http = Http.Server(app);
const io = new Io.Server(http, { cors: { origin: "*" } });
app.use(cors());
const port = 3000;


/* Epsagon Calcetines */




/* Server Http */



/* Peer Implementación */




//GET, PUT, POST, DELETE

/* Socket Io */

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let conectados = [];


io.on('connection', (socket) => {

    socket.on('usuario', (usuario) => {
        console.log('Usuario ' + usuario + ' conectado con la id ' + socket.id);
        conectados[usuario - 1] = socket.id
    });




    socket.on('inicioTurno', (turno) => {
        socket.broadcast.emit("actualizarTurno", turno);
        console.log("turno actualizado a: " + turno)
        console.log(conectados)
    });





    /* Socket Io Juego */


    /* 2.- Emitir Carta Jugada */

    socket.on('emitirCartaJugada', (cartaJugada) => {
        socket.broadcast.emit("actualizarCartaJugada", cartaJugada);
        console.log("turno actualizado a: " + cartaJugada)
    });


    /* 3.- Emitir UNO */
    socket.on('emitirUno', (estadoUno) => {
        socket.broadcast.emit("actualizarUno", estadoUno);
        console.log("Queda uno ")
        io.to(conectados[0]).emit("hola", estadoUno);
    });


    /* 4.- Emitir Estado Denunciable */
    socket.on('emitirEstadoDenunciable', (estadoDenunciable) => {
        socket.broadcast.emit("actualizarEstadoDenunciable", estadoDenunciable);
        console.log("Denunciable ")
    });


    /* 5.- Emitir Victoria */
    socket.on('emitirVictoria', (idJugador) => {
        socket.emit("actualizarEstadoVictoria", idJugador);
        socket.broadcast.emit("actualizarEstadoVictoria", idJugador);
        console.log("Victoria Jugador: " + idJugador)
    });























});
/* Fin Socket IO */






http.listen(8080, () => {
    console.log('listening socket on port 8080');
});


/* Path - Callback */
app.get("/cartas", (req, res) => {
    res.send(erradicate())
})

app.get("/pozo", (req, res) => {
    res.send();
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador1", (req, res) => {
    res.send(deck1);
    console.log(deck1)
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador2", (req, res) => {
    res.send(deck2);
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador3", (req, res) => {
    res.send(deck3);
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})
app.get("/jugador4", (req, res) => {
    res.send(deck4);
    /* res.json({ msg: 'This is CORS-enabled for all origins!' }) */
})



/*  */



app.listen(port, () => console.log("listening on port " + port))