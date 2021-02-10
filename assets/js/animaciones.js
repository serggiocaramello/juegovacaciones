const mazo = document.getElementById("mazo");
const tablero = document.getElementById("tablero");
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
  "0Y",
];
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
    this.cartasActivas = Array.from(document.querySelectorAll(".scale"));
    this.cartasActivas = this.cartasActivas.filter((x) =>
      x.classList.contains("scale")
    );

    this.cartasActivas.map((cartaActiva) => {
      if (cartaActiva.classList.contains("scale")) {
        cartaActiva.addEventListener("mouseenter", (e) => this.zoomIn(e));
      }
    });

    this.cartasActivas.map((cartaActiva) => {
      if (cartaActiva.classList.contains("scale")) {
        cartaActiva.addEventListener("mouseleave", (e) => this.zoomOut(e));
      }
    });
  }
  //   resetZoom() {
  //     this.cartasActivas = Array.from(document.querySelectorAll(".scale"));
  //     this.cartasActivas.map((cartaActiva) => {
  //       cartaActiva.removeEventListener("mouseenter", (e) => this.zoomIn(e));
  //     });
  //     this.cartasActivas.map((cartaActiva) => {
  //       cartaActiva.removeEventListener("mouseleave", (e) => this.zoomOut(e));
  //     });
  //   }
  seleccionarCarta() {
    this.cartasActivas.map((carta) => {
      carta.addEventListener("click", (e) => {
        e.target.classList.remove("scale");
        e.target.classList.add("cartajugada");
        let listadoClasesCarta = Array.from(e.target.classList);
        let idCarta = e.target.getAttribute("id");

        if (listadoClasesCarta.includes("jugador1")) {
          gsap.fromTo(`[id='${idCarta}']`, { top: "9rem", x: 0, duration: 1 });
        }
      });
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
    this.cantidadCartas++;
    const newCard = document.createElement("div");
    newCard.setAttribute("id", ordenCartas[0]);
    newCard.style.backgroundImage = `url("./assets/img/mazo/${ordenCartas[0]}.svg")`;
    ordenCartas.shift();
    newCard.classList.add(
      "carta",
      "scale",
      `jugador${this.id}`,
      `card-${this.cantidadCartas}`
    );
    tablero.appendChild(newCard);
    this.manoDeCartas = document.querySelectorAll(`.jugador${this.id}`);
  }

  reodenarCartas = () => {
    let xCartas = -(
      ((this.cantidadCartas - 1) *
        (carta.separacionCartas + carta.anchoCarta)) /
      2
    );
    for (let j = 1; j <= this.cantidadCartas; j++) {
      switch (this.id) {
        case 1:
          tl.to(`.jugador1.card-${j}`, {
            duration: 0.3,
            x: -xCartas,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 2:
          tl.to(`.jugador2.card-${j}`, {
            duration: 0.3,
            y: -xCartas,
            rotate: 90,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 3:
          tl.to(`.jugador3.card-${j}`, {
            duration: 0.3,
            x: -xCartas,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        case 4:
          tl.to(`.jugador4.card-${j}`, {
            duration: 0.3,
            y: -xCartas,
            rotate: 90,
          });
          xCartas += +carta.anchoCarta + carta.separacionCartas;
          break;
        default:
          break;
      }
    }
  };

  animRobarCarta = () => {
    switch (this.id) {
      case 1:
        tl.to(`.jugador1.card-${this.cantidadCartas}`, {
          duration: 1,
          bottom: "6rem",
          x: 0,
          ease: "back.out(1.2)",
        });
        break;
      case 2:
        tl.to(`.jugador2.card-${this.cantidadCartas}`, {
          duration: 1,
          y: 0,
          right: `${2 + carta.anchoCarta / 16}rem`,
          ease: "back.out(1.2)",
        });
        break;
      case 3:
        tl.to(`.jugador3.card-${this.cantidadCartas}`, {
          duration: 1,
          top: "6rem",
          x: 0,
          ease: "back.out(1.2)",
        });
        break;
      case 4:
        tl.to(`.jugador4.card-${this.cantidadCartas}`, {
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

  voltearCarta() {
    if (this.manoDeCartas) {
      if (this.id !== turno) {
        this.manoDeCartas.forEach((carta) => {
          carta.classList.add("facedown");
          carta.style.backgroundImage =
            'url("./assets/img/mazo/UNOPortada.svg")';
          carta.style.backgroundSize = "cover";
          carta.style.backgroundColor = "unset";
          carta.classList.remove("scale");
        });
      } else {
        this.manoDeCartas.forEach((carta) => {
          carta.classList.remove("facedown");
          carta.classList.add("scale");
        });
      }
    }
  }

  // jugarCarta() {
  //   switch (this.id) {
  //     case 1:
  //       let manoJugador1 = Array.from(document.querySelectorAll(".jugador1"));
  //       manoJugador1[0].addEventListener("click", (e) => {
  //         console.log(e.target);
  //       });
  //       // manoJugador1.addEventListener("click", (e) => {
  //       //   console.log(e.target);
  //       // });
  //       break;
  //     // case 2:
  //     //   let manoJugador2 = document.querySelectorAll(".jugador2");
  //     //   break;
  //     // case 3:
  //     //   let manoJugador3 = document.querySelectorAll(".jugador3");
  //     //   break;
  //     // case 4:
  //     //   let manoJugador4 = document.querySelectorAll(".jugador4");
  //     //   break;
  //     default:
  //       break;
  //   }
  // }

  turno() {
    this.robarCarta();
    this.animRobarCarta();
    this.reodenarCartas();
    carta.zoomCarta();
    carta.seleccionarCarta();
  }
}

const carta = new Carta();
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
  jugadores.map((jugador) => jugador.voltearCarta());
  //   carta.resetZoom();
  carta.zoomCarta();
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
