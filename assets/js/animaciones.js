const mazo = document.getElementById("mazo");
const tablero = document.getElementById("tablero");
const cambiarJugador = document.getElementById("cambiarjugador");
const tl = gsap.timeline();
let cantidadCartasPozo = 0;
// Mazo de prueba, funciona con mayusculas y minusculas.
const ordenCartas = [
  "1r",
  "VR",
  "+4r",
  "SKY",
  "2b",
  "5B",
  "4y",
  "3G",
  "0Y",
  "8R",
  "5G",
  "9B",
  "3R",
  "1Y",
  "3Y",
  "1B",
  "0R",
  "0B",
  "0G",
];
//Indicamos quien esta jugando en este equipo.
// En este caso el jugdor 1 es quien juega en este equipo.
const jugadorEsteEquipo = 1;
// Indicamos que jugador esta jugando en este turno.
let turno = 1;

// Al redimensionar la ventana, las cartas del pozo quedan desplazadas del pozo, esta funcion las vuelve a alinear con el pozo cada vez que se redimensiona la ventana.
// Prueba comentando desde la funcion y la linea que aparece justo despues de esta.
function alinearCartasPozo() {
  let pozo = document.getElementById("pozo").getBoundingClientRect();
  gsap.to(".cartajugada", {
    top: pozo.top,
    x: 0,
    left: pozo.left,
    duration: 0,
  });
}
window.onresize = alinearCartasPozo;

class Carta {
  constructor() {
    this.anchoCarta = 71;
    this.altoCarta = 100;
    this.separacionCartas = 10;
    this.cartasActivas;
  }

  zoomIn(e) {
    gsap.to(e.target, { scale: 1.4 });
  }
  zoomOut(e) {
    gsap.to(e.target, { scale: 1 });
  }
  zoomCarta() {
    this.cartasActivas = Array.from(
      document.querySelectorAll(`.jugador${jugadorEsteEquipo}`)
    );
    this.cartasActivas.map((cartaActiva) => {
      cartaActiva.addEventListener("mouseenter", (e) => this.zoomIn(e));
    });

    this.cartasActivas.map((cartaActiva) => {
      cartaActiva.addEventListener("mouseleave", (e) => this.zoomOut(e));
    });
  }
}

class Jugador {
  constructor(id, nombre, avatar) {
    this.cantidadCartas = 0;
    this.id = id;
    this.manoDeCartas;
    this.nombre = nombre;
    this.avatar = avatar;
  }

  imprimirNombreTablero() {
    const infoJugador = document.createElement("div");
    const avatar = document.createElement("img");
    const nombre = document.createElement("div");
    avatar.src = this.avatar;
    nombre.textContent = this.nombre;
    infoJugador.classList.add(`infojugador${this.id}`);
    avatar.classList.add(`avatarjugador${this.id}`);
    nombre.classList.add(`nombrejugador${this.id}`);
    infoJugador.appendChild(avatar);
    infoJugador.appendChild(nombre);
    if (this.id == jugadorEsteEquipo) {
      const boton = document.createElement("div");
      boton.setAttribute("id", "botoncastigo");
      boton.classList.add("botoncastigo");
      infoJugador.appendChild(boton);
    }
    tablero.append(infoJugador);
  }

  robarCarta() {
    let soundFlip = new sound("./assets/sonidos/dealingcard.wav");
    this.cantidadCartas = this.cantidadCartas + 1;
    const newCard = document.createElement("div");
    newCard.setAttribute("id", ordenCartas[0]);
    // nombreImagenCarta recibe el nombre de la carta y hace que siempre la ultima letra sea mayuscula, esto es util porque podemos usar la misma imagen para la carta 1r y 1R.
    const nombreImagenCarta = ordenCartas[0].toUpperCase();
    if (this.id == jugadorEsteEquipo) {
      newCard.style.backgroundImage = `url("./assets/img/mazo/${ordenCartas[0]}.svg")`;
      newCard.classList.add("facedown");
    } else {
      newCard.style.backgroundImage = `url("./assets/img/mazo/UNOPortada.svg")`;
    }
    newCard.classList.add("carta", `jugador${this.id}`);

    tablero.appendChild(newCard);
    this.animRobarCarta();
    soundFlip.play();
    ordenCartas.shift();
  }

  reordenarCartas = () => {
    this.manoDeCartas = Array.from(
      document.querySelectorAll(`.jugador${this.id}`)
    );
    // Variable que determina la distancia entre cartas
    let xCartas = -(
      ((this.cantidadCartas - 1) *
        (carta.separacionCartas + carta.anchoCarta)) /
      2
    );

    this.manoDeCartas.map((cartaRobada) => {
      switch (this.id) {
        case 1:
          tl.to(`[id='${cartaRobada.id}']`, {
            duration: 0.3,
            x: -xCartas,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 2:
          tl.to(`[id='${cartaRobada.id}']`, {
            duration: 0.3,
            y: -xCartas,
            rotate: -90,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 3:
          tl.to(`[id='${cartaRobada.id}']`, {
            duration: 0.3,
            x: -xCartas,
            rotate: 180,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 4:
          tl.to(`[id='${cartaRobada.id}']`, {
            duration: 0.3,
            y: -xCartas,
            rotate: 90,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        default:
          break;
      }
    });
  };

  animRobarCarta = () => {
    let posicionMazo = document.getElementById("mazo").getBoundingClientRect();
    switch (this.id) {
      case 1:
        tl.fromTo(
          `[id='${ordenCartas[0]}']`,
          {
            bottom: posicionMazo.bottom,
            x: 0,
            left: posicionMazo.left,
          },
          {
            duration: 0.8,
            bottom: "6rem",
            x: 0,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 2:
        tl.fromTo(
          `[id='${ordenCartas[0]}']`,
          {
            right: posicionMazo.right,
          },
          {
            duration: 1,
            y: 0,
            right: `${2 + carta.anchoCarta / 16}rem`,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 3:
        tl.fromTo(
          `[id='${ordenCartas[0]}']`,
          {
            bottom: posicionMazo.bottom,
            x: 0,
            left: posicionMazo.left,
          },
          {
            duration: 1,
            top: "6rem",
            x: 0,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 4:
        tl.fromTo(
          `[id='${ordenCartas[0]}']`,
          {
            left: posicionMazo.left,
          },
          {
            duration: 1,
            y: 0,
            left: `${2 + carta.anchoCarta / 16}rem`,
            ease: "back.out(1.2)",
          }
        );
        break;
      default:
        break;
    }
  };

  animVolteaJuego = () => {
    let soundVolteaTablero = new sound("./assets/sonidos/voltearjuego.wav");
    gsap.to(".flecha1", {
      scaleX: -1,
      rotate: -90,
      duration: 1,
    });
    gsap.to(".flecha2", {
      scaleX: -1,
      rotate: 90,
      duration: 1,
    });
    gsap.to(".flecha3", {
      scaleX: -1,
      rotate: -90,
      duration: 1,
    });
    gsap.to(".flecha4", {
      scaleX: -1,
      rotate: 90,
      duration: 1,
    });
    soundVolteaTablero.play();
  };

  saltaTurno = () => {
    let soundSaltaTurno = new sound("./assets/sonidos/pierdeturno.mp3");
    soundSaltaTurno.play();
  };

  // voltearCarta() {
  //   if (this.manoDeCartas) {
  //     if (this.id !== jugadorEsteEquipo) {
  //       this.manoDeCartas.forEach((carta) => {
  //         carta.classList.add("facedown");
  //         carta.style.backgroundImage =
  //           'url("./assets/img/mazo/UNOPortada.svg")';
  //         carta.style.backgroundSize = "cover";
  //         carta.style.backgroundColor = "unset";
  //       });
  //     } else {
  //       this.manoDeCartas.forEach((carta) => {
  //         carta.classList.remove("facedown");
  //       });
  //     }
  //   }
  // }

  seleccionarCarta() {
    let counter = 0;
    carta.cartasActivas.map((cartaActiva) => {
      cartaActiva.addEventListener("click", (e) => {
        let listadoClasesCarta = Array.from(e.target.classList);
        if (listadoClasesCarta.includes(`jugador${jugadorEsteEquipo}`)) {
          this.cantidadCartas--;
          cantidadCartasPozo++;
          e.target.classList.remove("scale");
          e.target.classList.remove(`jugador${this.id}`);
          e.target.classList.add("cartajugada");
          let idCarta = e.target.getAttribute("id");
          let pozo = document.getElementById("pozo").getBoundingClientRect();

          tl.to(`[id='${idCarta}']`, {
            top: pozo.top,
            x: 0,
            left: pozo.left,
            duration: 1,
            zIndex: cantidadCartasPozo,
          });

          if (
            idCarta === "VR" ||
            idCarta === "VB" ||
            idCarta === "VG" ||
            idCarta === "VY"
          ) {
            this.animVolteaJuego();
          }

          if (
            idCarta == "SKR" ||
            idCarta == "SKB" ||
            idCarta == "SKG" ||
            idCarta == "SKY"
          ) {
            this.saltaTurno();
          }

          // Para que las cartas de la mano se reordenen
          this.reordenarCartas();
        }
      });
    });
  }

  turno() {
    this.robarCarta();
    this.reordenarCartas();
    carta.zoomCarta();
    this.seleccionarCarta();
  }
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const carta = new Carta();
// Dimensiones cartas
mazo.style.width = `${carta.anchoCarta}px`;
mazo.style.height = `${carta.altoCarta}px`;

// Creación de jugadores
const jugador1 = new Jugador(1, "Leonardo", "https://picsum.photos/100");
const jugador2 = new Jugador(2, "Raphael", "https://picsum.photos/100");
const jugador3 = new Jugador(3, "Miguel Ángel", "https://picsum.photos/100");
const jugador4 = new Jugador(4, "Donatello", "https://picsum.photos/100");
const jugadores = [jugador1, jugador2, jugador3, jugador4];

jugadores.map((jugador) => jugador.imprimirNombreTablero());

// Al cambiar de turno
cambiarJugador.addEventListener("click", (e) => {
  e.preventDefault();
  turno == 4 ? (turno = 1) : turno++;
  // jugadores.map((jugador) => jugador.voltearCarta());
  //reiniciar segundos del contador
  gameContador.reset();
});

// Al presionar el mazo
mazo.addEventListener("click", () => {
  switch (turno) {
    case 1:
      jugador1.turno();

      break;
    case 2:
      jugador2.turno();
      break;
    case 3:
      jugador3.turno();
      break;
    case 4:
      jugador4.turno();
      break;
    default:
      break;
  }
});

class Contador {
  constructor(time) {
    this.isWaiting = false;
    this.isRunning = false;
    this.initialSeconds = time;
    this.seconds = time;
    this.countdownTimer;
    this.finalCountdown = false;
  }
  logic() {
    let minutes = Math.round((this.seconds - 30) / 60);
    let remainingSeconds = this.seconds % 60;
    if (remainingSeconds < 10) {
      remainingSeconds = "0" + remainingSeconds;
    }
    document.getElementById("waiting_time").innerHTML =
      minutes + ":" + remainingSeconds;

    if (remainingSeconds < 10) {
      document.getElementById("waiting_time").classList.add("timealert");
    }
    if (this.seconds == 0) {
      this.finalCountdown = true;
    } else {
      this.isWaiting = true;
      this.seconds--;
    }
  }
  start() {
    setInterval(this.logic.bind(this), 1000);
  }
  reset() {
    this.seconds = this.initialSeconds;
    document.getElementById("waiting_time").classList.remove("timealert");
  }
}

// Nueva instancia de contador
const gameContador = new Contador(20);
// Iniciar gameContador
gameContador.start();
