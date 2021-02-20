const avatarSeleccionado = document.getElementById("avatarseleccionado");
const avatares = document.getElementById("avatares");
const botonLogin = document.getElementById("login-boton")
const avatarJugador1 = document.getElementById("avatar-jugador1");
let srcAvatar = "assets/img/avatares/36-user.svg" ;
let nombreJugador1 = document.getElementById("jugador1");
let usuarioEnvioInfo = false;

avatares.addEventListener("click", (e) => {
    let avatar = e.target
    srcAvatar = avatar.getAttribute("src");
    avatarSeleccionado.setAttribute("src", srcAvatar);
    
});

botonLogin.addEventListener("click", (e) => {
    let inputNombre = document.getElementById("slot").value;
    if (usuarioEnvioInfo == false && inputNombre != "") {
    let estadoJugador1 = document.getElementById("estado-jugador1");
    avatarJugador1.setAttribute("src", srcAvatar);
    nombreJugador1.textContent = inputNombre;
    estadoJugador1.textContent = "Pendiente";
    estadoJugador1.classList.add("estado-jugador-pendiente");
    usuarioEnvioInfo = true;
    document.getElementById("slot").value = "";
    console.log(document.getElementById("slot"))
    }
})