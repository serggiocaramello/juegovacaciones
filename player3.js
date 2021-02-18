const socket = io('ws://localhost:8080');

/* Asignar el socket ID a una variable */

let socket_id = socket.on("connect", () => {
    socket_id = socket.id
});

socket.on('usuario', usuario => {
    usuario = 'jugador1';
});

document.querySelector('button').onclick = () => {
    text = 'hola';
    socket.emit('message', text);
}