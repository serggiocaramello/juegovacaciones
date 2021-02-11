const mazo = document.getElementById("mazo");
const tablero = document.getElementById("tablero");
const pozo = document.getElementById("pozo");
const cambiarJugador = document.getElementById("cambiarjugador");
const tl = gsap.timeline();
const ordenCartas = [
  "2R",
  "4Y",
  "5B",
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
    tablero.append(infoJugador);
  }

  robarCarta() {
    this.cantidadCartas = this.cantidadCartas + 1;
    const newCard = document.createElement("div");
    newCard.setAttribute("id", ordenCartas[0]);
    // Si el jugador de este equipo roba cartas estas se muestran.
    if (this.id == jugadorEsteEquipo) {
      newCard.style.backgroundImage = `url("./assets/img/mazo/${ordenCartas[0]}.svg")`;
    }
    // En caso contrario no se muestran las cartas.
    else {
      newCard.style.backgroundImage = `url("./assets/img/mazo/UNOPortada.svg")`;
    }
    newCard.classList.add(
      "carta",
      `jugador${this.id}`
      // `card-${this.cantidadCartas}`
    );
    tablero.appendChild(newCard);
    this.animRobarCarta();
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
    console.log(xCartas);
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
    switch (this.id) {
      case 1:
        tl.to(`[id='${ordenCartas[0]}']`, {
          duration: 1,
          bottom: "6rem",
          x: 0,
          ease: "back.out(1.2)",
        });
        break;
      case 2:
        tl.to(`[id='${ordenCartas[0]}']`, {
          duration: 1,
          y: 0,
          right: `${2 + carta.anchoCarta / 16}rem`,
          ease: "back.out(1.2)",
        });
        break;
      case 3:
        tl.to(`[id='${ordenCartas[0]}']`, {
          duration: 1,
          top: "6rem",
          x: 0,
          ease: "back.out(1.2)",
        });
        break;
      case 4:
        tl.to(`[id='${ordenCartas[0]}']`, {
          duration: 1,
          y: 0,
          left: `${2 + carta.anchoCarta / 16}rem`,
          ease: "back.out(1.2)",
        });
        break;
      default:
        break;
    }
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
    carta.cartasActivas.map((cartaActiva) => {
      cartaActiva.addEventListener("click", (e) => {
        let listadoClasesCarta = Array.from(e.target.classList);
        if (listadoClasesCarta.includes(`jugador${jugadorEsteEquipo}`)) {
          this.cantidadCartas--;
          e.target.classList.remove("scale");
          e.target.classList.remove(`jugador${this.id}`);
          e.target.classList.add("cartajugada");
          let idCarta = e.target.getAttribute("id");
          gsap.to(`[id='${idCarta}']`, { top: "9rem", x: 0, duration: 1 });
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