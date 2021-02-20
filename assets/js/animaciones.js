const mazo = document.getElementById("mazo");
const tablero = document.getElementById("tablero");
const cambiarJugador = document.getElementById("cambiarjugador");
const tl = gsap.timeline();
let cantidadCartasPozo = 0;
// Mazo de prueba, funciona con mayusculas y minusculas.
const mazoCartas = [
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
// En sentido horario incremento es = 1, en antihorario debe cambiar a -1.
let incremento = 1;

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
    this.cartaPozo = "3g";
    this.currentNumero = document.getElementById("currentNumero");
    this.currentColor = document.getElementById("currentColor");
    this.colorPicker = document.getElementById("colorPicker");
    this.anchoCarta = 71;
    this.altoCarta = 100;
    this.separacionCartas = 0;
    this.cartasActivas;
    this.soundFlip = new Sound("./assets/sonidos/dealingcard.wav");
    this.soundVolteaTablero = new Sound("./assets/sonidos/voltearjuego.wav");
    this.soundSaltaTurno = new Sound("./assets/sonidos/pierdeturno.mp3");
    this.cartasCambioSentido = ["VR", "VB", "VG", "VY"];
    this.cartasSaltaTurno = ["SKR", "SKB", "SKG", "SKY"];
    this.cartasWild = ["WDB", "WDG", "WDR", "WDY"];
    this.cartasActivasMas4 = ["+4B", "+4R", "+4Y", "+4G"];
    this.colors = {
      R: "red",
      B: "blue",
      G: "green",
      Y: "yellow",
    };
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
  setColor(colorSelected) {
    // color de la carta del pozo.
    const cardColor = this.cartaPozo[this.cartaPozo.length - 1].toUpperCase();
    if (colorSelected) {
      this.currentColor.style.backgroundColor = this.colors[colorSelected];
    } else if (
      // Si la carta del pozo es un wild o un + 4, currentColor no se le asigna un valor a currentColor.
      this.cartasWild.includes(this.cartaPozo.toUpperCase()) ||
      this.cartasActivasMas4.includes(this.cartaPozo.toUpperCase())
    ) {
      this.currentColor.style.backgroundColor = "unset";
    } else {
      this.currentColor.style.backgroundColor = this.colors[cardColor];
    }
  }
  setNumero() {
    this.currentNumero.textContent = this.cartaPozo
      .split("")
      .slice(0, this.cartaPozo.length - 1)
      .join("");
  }
  setCartaPozoInfo() {
    this.setNumero();
    this.setColor();
  }
  crearElemento({ el, id, clase, src, text, padre, backgroundImage }) {
    if (el && padre) {
      const elemento = document.createElement(el);
      if (id) {
        elemento.setAttribute("id", id);
      }
      if (clase) {
        elemento.classList.add(...clase.split(" "));
      }
      if (src) {
        elemento.src = src;
      }
      if (text) {
        elemento.textContent = text;
      }
      if (backgroundImage) {
        elemento.style.backgroundImage = backgroundImage;
      }
      padre.appendChild(elemento);
      return elemento;
    }
  }

  primeraCartaPozo() {
    const mazo = document.getElementById("mazo").getBoundingClientRect();
    const pozo = document.getElementById("pozo").getBoundingClientRect();

    const newCard = this.crearElemento({
      el: "div",
      clase: "carta cartajugada",
      id: mazoCartas[0],
      padre: tablero,
    });
    const backFace = this.crearElemento({
      el: "div",
      clase: "carta back-face",
      padre: newCard,
    });
    const frontFace = this.crearElemento({
      el: "div",
      clase: "carta front-face",
      padre: newCard,
      backgroundImage: `url("./assets/img/mazo/${mazoCartas[0].toUpperCase()}.svg")`,
    });
    // Elimina la primera carta del mazo.
    mazoCartas.shift();
    // Inicia el sonido al robar carta.
    carta.soundFlip.play();
    // Animacion  primera carta pozo
    tl.fromTo(
      newCard,
      {
        left: mazo.left,
        rotateY: 0,
        x: 0,
      },
      {
        left: pozo.left,
        rotateY: 180,
        x: 0,
        duration: 1,
        ease: "back.out(1.2)",
      }
    );

    // Se indica el valor de la carta del pozo.
    this.cartaPozo = newCard.getAttribute("id");
    // Se extraen el valor y el color.
    this.setCartaPozoInfo();

    newCard.classList.remove("cartajugada");
  }

  getColor() {
    return this.currentColor.style.backgroundColor;
  }
  getNumero() {
    return this.currentNumero.textContent;
  }

  // borrarCartaPozo(e) {
  //   console.log(this.cartaPozo);
  //   document.getElementById(this.cartaPozo).remove();
  //   this.cartaPozo = e.target.parentElement.getAttribute("id");
  //   this.setCartaPozoInfo();
  // }
}

class Jugador {
  constructor(idJugador, nombre, avatar) {
    this.cantidadCartasMano = 0;
    this.manoDeCartas;
    this.idJugador = idJugador;
    this.nombre = nombre;
    this.avatar = avatar;
  }

  crearElemento({ el, id, clase, src, text, padre }) {
    if (el && padre) {
      const elemento = document.createElement(el);
      if (id) {
        elemento.setAttribute("id", id);
      }
      if (clase) {
        elemento.classList.add(clase);
      }
      if (src) {
        elemento.src = src;
      }
      if (text) {
        elemento.textContent = text;
      }
      padre.appendChild(elemento);
      return elemento;
    }
  }

  imprimirInfo() {
    this.imprimirNombreTablero();
    this.imprimirEmoticones();
  }

  imprimirNombreTablero() {
    const infoJugador = this.crearElemento({
      el: "div",
      clase: `infojugador${this.idJugador}`,
      padre: tablero,
    });
    const avatar = this.crearElemento({
      el: "img",
      src: this.avatar,
      clase: `avatarjugador${this.idJugador}`,
      padre: infoJugador,
    });
    const nombre = this.crearElemento({
      el: "div",
      text: this.nombre,
      clase: `nombrejugador${this.idJugador}`,
      padre: infoJugador,
    });

    // Si el jugador es el que esta en este pc, se imprime además el boton UNO
    if (this.idJugador == jugadorEsteEquipo) {
      const boton = this.crearElemento({
        el: "div",
        id: "botoncastigo",
        clase: "botoncastigo",
        padre: infoJugador,
      });
    }
  }

  imprimirEmoticones() {
    if (this.idJugador == jugadorEsteEquipo) {
      const infoJugador = document.getElementsByClassName(
        `infojugador${this.idJugador}`
      )[0];
      const emoticonMenu = this.crearElemento({
        el: "nav",
        clase: "circular-menu",
        padre: infoJugador,
      });

      const circle = this.crearElemento({
        el: "div",
        clase: "circle",
        padre: emoticonMenu,
      });

      const emoticones = [
        "enamorado.svg",
        "frio.svg",
        "guino.svg",
        "indignacion.svg",
        "riendo.svg",
        "sorprendido.svg",
      ];

      emoticones.map((emoticon) => {
        this.crearElemento({
          el: "img",
          src: `assets/img/emoticons/${emoticon}`,
          clase: "emoticon",
          padre: circle,
        });
      });

      const botonEmoticon = this.crearElemento({
        el: "img",
        src: "/assets/img/emoticons/ejemplo.svg",
        clase: "menu-button",
        padre: emoticonMenu,
      });

      // funcion para posicionar emoticones y darles clase open al presionar boton emoticones
      var items = document.querySelectorAll(".emoticon");

      for (var i = 0, l = items.length; i < l; i++) {
        items[i].style.left =
          (
            78 -
            10 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)
          ).toFixed(4) + "%";

        items[i].style.top =
          (
            30 +
            35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)
          ).toFixed(4) + "%";
      }

      document.querySelector(".menu-button").onclick = function (e) {
        e.preventDefault();
        document.querySelector(".circle").classList.toggle("open");
      };
    }
  }

  robarCarta(tiempo) {
    this.cantidadCartasMano++;
    const newCard = document.createElement("div");
    const backFace = document.createElement("div");
    const frontFace = document.createElement("div");
    backFace.classList.add("back-face");
    frontFace.classList.add("front-face");

    newCard.appendChild(backFace);
    newCard.appendChild(frontFace);

    newCard.classList.add("carta", "carta-robada", `jugador${this.idJugador}`);
    // Si es el jugador de este pc se muestra su carta, en caso contrario se muestra boca abajo.
    if (this.idJugador == jugadorEsteEquipo) {
      // Se imprime en la carta el id de la primera carta del mazo.
      newCard.setAttribute("id", mazoCartas[0]);
      frontFace.style.backgroundImage = `url("./assets/img/mazo/${mazoCartas[0].toUpperCase()}.svg")`;
    }
    // Imprime la carta.
    tablero.appendChild(newCard);
    // Inicia la animación de robar carta.
    this.animRobarCarta(tiempo);
    // Inicia el sonido al robar carta.
    carta.soundFlip.play();
    // Inicia la animación al hacer zoom a la carta.
    carta.zoomCarta();
    // Elimina la carta del array mazoCartas.
    mazoCartas.shift();
    // Se reordenan las cartas.
    this.animReordenarCartas();
  }

  animRobarCarta(tiempo) {
    // posicionMazo nos sirve para que green sock sepa que las cartas deben salir desde las coordenadas del mazo.
    let posicionMazo = document.getElementById("mazo").getBoundingClientRect();
    this.manoDeCartas = Array.from(
      document.querySelectorAll(`.jugador${this.idJugador}`)
    );
    const cartaRobada = this.manoDeCartas[this.manoDeCartas.length - 1];
    switch (this.idJugador) {
      case 1:
        tl.fromTo(
          cartaRobada,
          {
            // top: posicionMazo.top,
            bottom: posicionMazo.bottom,
            x: 0,
            y: 0,
            left: posicionMazo.left,
            rotateX: 0,
          },
          {
            // top: "unset",
            duration: tiempo,
            bottom: "6rem",
            x: 0,
            y: 0,
            rotate: 180,
            rotateX: 180,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 2:
        tl.fromTo(
          cartaRobada,
          { left: posicionMazo.left, x: 0, y: 0 },
          {
            x: 0,
            y: 0,
            left: "unset",
            duration: tiempo,
            right: `${2 + carta.anchoCarta / 16}rem`,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 3:
        tl.fromTo(
          cartaRobada,
          {
            // top: posicionMazo.top,
            x: 0,
            y: 0,
            left: posicionMazo.left,
          },
          {
            duration: tiempo,
            top: "6rem",
            x: 0,
            y: 0,
            ease: "back.out(1.2)",
          }
        );
        break;
      case 4:
        tl.fromTo(
          cartaRobada,
          {
            left: posicionMazo.left,
            x: 0,
            y: 0,
          },
          {
            duration: tiempo,
            x: 0,
            y: 0,
            left: `${2 + carta.anchoCarta / 16}rem`,
            ease: "back.out(1.2)",
          }
        );
        break;
      default:
        break;
    }
  }

  animReordenarCartas() {
    // Variable que determina la posicion de cada carta.
    let posCarta = -(
      ((this.cantidadCartasMano - 1) *
        (carta.separacionCartas + carta.anchoCarta)) /
      2
    );

    // La funcion ordena cada una de las cartas de la mano.
    this.manoDeCartas.map((cartaEnMano) => {
      const clasesCartaMano = Array.from(cartaEnMano.classList);

      if (clasesCartaMano.includes(`jugador${this.idJugador}`)) {
        switch (this.idJugador) {
          case 1:
            tl.to(cartaEnMano, {
              duration: 0.15,
              x: -posCarta,
            });
            posCarta += +carta.anchoCarta + carta.separacionCartas;
            break;
          case 2:
            tl.to(cartaEnMano, {
              duration: 0.15,
              y: -posCarta,
              rotate: -90,
            });
            posCarta += +carta.anchoCarta + carta.separacionCartas;
            break;
          case 3:
            tl.to(cartaEnMano, {
              duration: 0.15,
              x: -posCarta,
              rotate: 180,
            });
            posCarta += +carta.anchoCarta + carta.separacionCartas;
            break;
          case 4:
            tl.to(cartaEnMano, {
              duration: 0.15,
              y: -posCarta,
              rotate: 90,
            });
            posCarta += +carta.anchoCarta + carta.separacionCartas;
            break;
          default:
            break;
        }
      }
    });
  }

  seleccionarColor() {
    // Aparece el color picker.
    gsap.to(carta.colorPicker, {
      display: "flex",
      opacity: 1,
      duration: 1,
    });
    // Al seleccionar un color del color picker.
    carta.colorPicker.addEventListener("click", (e) => {
      const colorSelected = e.target.classList[0];
      // Fijamos la variable carta.currentColor con el color seleccionado.
      carta.setColor(colorSelected);
      // Desaparece el color picker.
      gsap.to(carta.colorPicker, {
        display: "none",
        opacity: 0,
        duration: 1,
      });
    });
  }

  animSeleccionarCarta(e) {
    let idCarta = e.target.parentElement.getAttribute("id");
    let pozo = document.getElementById("pozo").getBoundingClientRect();
    let cartaSeleccionada = e.target.parentElement.getBoundingClientRect();
    // Tiempo que dura la animación
    const time = 0.5;
    tl.fromTo(
      `[id='${idCarta}']`,
      {
        top: cartaSeleccionada.top,
        bottom: "unset",
        x: 0,
        y: 0,
      },
      {
        top: pozo.top,
        bottom: "unset",
        x: 0,
        y: 0,
        left: pozo.left,
        duration: time,
        onComplete: () => {
          // Se elimina la clase "carta-robada"
          e.target.parentElement.classList.remove(
            "carta-robada",
            `jugador${this.idJugador}`
          );
          // Se borra la carta anterior del pozo
          // carta.borrarCartaPozo(e);
          console.log(carta.cartaPozo);
          document.getElementById(carta.cartaPozo).remove();
          carta.cartaPozo = idCarta;
          carta.setCartaPozoInfo();
          // Para que las cartas de la mano se reordenen
          this.animReordenarCartas();
        },
      }
    );
    if (carta.cartasCambioSentido.includes(idCarta)) {
      // Si la carta es un cambio de sentido, cambia el sentido del juego
      this.animVolteaJuego();
    } else if (carta.cartasSaltaTurno.includes(idCarta)) {
      // Si la carta es un salto de turno, el siguiente jugador pierde su turno
      this.saltaTurno();
    } else if (carta.cartasWild.includes(idCarta.toUpperCase())) {
      // Si la carta es un wild, se llama al color picker.
      this.seleccionarColor();
    } else if (carta.cartasActivasMas4.includes(idCarta.toUpperCase())) {
      // Si la carta es un +4, se llama al color picker.
      this.seleccionarColor();
    }
  }

  seleccionarCarta() {
    // carta.cartasActivas son las cartas que tiene en la mano el jugador.
    carta.cartasActivas.map((cartaActiva) => {
      cartaActiva.addEventListener(
        "click",
        (e) => {
          let listadoClasesCarta = Array.from(e.target.parentElement.classList);
          if (listadoClasesCarta.includes(`jugador${jugadorEsteEquipo}`)) {
            this.cantidadCartasMano--;
            cantidadCartasPozo++;
            e.target.parentElement.classList.add("cartajugada");

            // Animacion cuando carta seleccionada va al pozo
            this.animSeleccionarCarta(e);
          }
        },
        true
      );
    });
  }

  animVolteaJuego() {
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
    carta.soundVolteaTablero.play();
  }

  saltaTurno() {
    carta.soundSaltaTurno.play();
  }

  turno() {
    this.robarCarta(0.8);
    this.seleccionarCarta();
  }
}

// Clase para crear los sonidos, se instancia dentro de las propiedades de la clase Carta.
class Sound {
  constructor(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
  }
  play() {
    document.body.appendChild(this.sound);
    this.sound.play();
  }
  stop() {
    this.sound.pause();
  }
}

const carta = new Carta();
// Dimensiones cartas
mazo.style.width = `${carta.anchoCarta}px`;
mazo.style.height = `${carta.altoCarta}px`;

// Se inicializan los valores del numero actual y color actual de la carta del pozo
carta.setColor();
carta.setNumero();

// Creación de jugadores
const jugador1 = new Jugador(
  1,
  "Leonardo",
  "assets/img/avatares/01-mexican.svg"
);
const jugador2 = new Jugador(2, "Raphael", "assets/img/avatares/02-man.svg");
const jugador3 = new Jugador(
  3,
  "Miguel Ángel",
  "assets/img/avatares/03-pirates.svg"
);
const jugador4 = new Jugador(4, "Donatello", "assets/img/avatares/04-girl.svg");
const jugadores = [jugador1, jugador2, jugador3, jugador4];

jugadores.map((jugador) => {
  jugador.imprimirInfo();
});

// Al cambiar de turno
cambiarJugador.addEventListener("click", (e) => {
  e.preventDefault();
  // Cuando hay cambio de sentido incremento debera ser -1
  turno == 4 ? (turno = 1) : (turno += incremento);
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

// To do
// Implementar para 2 jugadores y 3 jugadores

/* Nuevos Métodos */

reparticionCartas(2, 0.3);
carta.primeraCartaPozo();

function reparticionCartas(num, tiempo) {
  for (let i = 1; i <= num; i++) {
    jugadores.map((jugador) => {
      jugador.robarCarta(tiempo);
    });
  }
}

function animPintarCarta() {
  let idCarta = "VR";
  let pozo = document.getElementById("pozo").getBoundingClientRect();
  tl.to(`[id='${idCarta}']`, {
    top: pozo.top,
    x: 0,
    left: pozo.left,
    duration: 1,
  });
}
function animPintarCarta2() {
  let idCarta = "VR";
  let pozo = document.getElementById("pozo").getBoundingClientRect();
  tl.to(`[id='cartaJugador2-1']`, {
    top: pozo.top,
    x: 0,
    left: pozo.left,
    duration: 1,
  });
}

// Simulacion de oponentes jugando cartas
const manoOponente2 = Array.from(document.querySelectorAll(`.jugador2`));
const manoOponente3 = Array.from(document.querySelectorAll(`.jugador3`));
const manoOponente4 = Array.from(document.querySelectorAll(`.jugador4`));
manoOponente2.map((x) =>
  x.addEventListener("click", (e) => oponenteJuegaCarta(2, 1))
);
manoOponente3.map((x) =>
  x.addEventListener("click", (e) => oponenteJuegaCarta(3, 1))
);
manoOponente4.map((x) =>
  x.addEventListener("click", (e) => oponenteJuegaCarta(4, 1))
);

// Variable que guarda el id de la carta jugada por un oponente
let mano = ["3r", "8r", "5g", "9b", "3r", "1y", "3y", "1b", "1b", "1g"];

// Funcion que se ejecutara despues de la animación
function animOponenteOrdenaCartas(idJugador, cartOpJugada, manoOponente) {
  // Se elimina la clase "carta-robada"
  cartOpJugada.classList.remove("carta-robada", `jugador${idJugador}`);
  // Se agrega la clase cartajugada
  cartOpJugada.classList.add("cartajugada");
  // Se borra la carta anterior del pozo
  document.getElementById(carta.cartaPozo).remove();
  carta.cartaPozo = cartOpJugada.id;
  carta.setCartaPozoInfo();

  // Variable que determina la posicion de cada carta.
  let posCarta = -(
    ((this.cantidadCartasMano - 1) *
      (carta.separacionCartas + carta.anchoCarta)) /
    2
  );

  // La funcion ordena cada una de las cartas de la mano.
  manoOponente.map((cartaEnMano) => {
    // Para que las cartas de la mano se reordenen
    switch (idJugador) {
      case 2:
        jugador2.cantidadCartasMano--;
        tl.to(cartaEnMano, {
          duration: 0.15,
          y: -posCarta,
        });
        posCarta += +carta.anchoCarta + carta.separacionCartas;
        break;
      case 3:
        jugador3.cantidadCartasMano--;
        tl.to(cartaEnMano, {
          duration: 0.15,
          x: -posCarta,
        });
        posCarta += +carta.anchoCarta + carta.separacionCartas;
        break;
      case 4:
        tl.to(cartaEnMano, {
          duration: 0.15,
          y: -posCarta,
        });
        posCarta += +carta.anchoCarta + carta.separacionCartas;
        break;
      default:
        break;
    }
  });
}

// Metodo para animar cartas de oponentes
function oponenteJuegaCarta(idJugador, time) {
  const pozo = document.getElementById("pozo").getBoundingClientRect();
  const manoOponente = Array.from(
    document.querySelectorAll(`.jugador${idJugador}`)
  );

  if (manoOponente.length > 0) {
    const cartaOponenteJugada = manoOponente[manoOponente.length - 1];
    const frontFace = cartaOponenteJugada.children[1];

    // Eliminar al final, es solo para darle un valor a la carta jugada por el oponente
    let cartaJugadaOponente = mano[0];
    // Eliminar al final

    cartaOponenteJugada.setAttribute("id", cartaJugadaOponente);
    frontFace.style.backgroundImage = `url("./assets/img/mazo/${cartaJugadaOponente.toUpperCase()}.svg")`;
    // eliminar al final, es para eliminar la primera carta del array mano, que tiene datos de relleno
    mano.shift();
    // eliminar al final

    const animcartaOponenteJugada = gsap.fromTo(
      cartaOponenteJugada,
      {
        top: cartaOponenteJugada.getBoundingClientRect().top,
        left: cartaOponenteJugada.getBoundingClientRect().left,
        bottom: "unset",
        rotateX: 0,
        x: 0,
        y: 0,
      },
      {
        top: pozo.top,
        left: pozo.left,
        bottom: "unset",
        rotate: -180,
        rotateX: 180,
        x: 0,
        y: 0,
        duration: time,
        onCompleteParams: [idJugador, cartaOponenteJugada, manoOponente],
        onComplete: animOponenteOrdenaCartas,
      }
    );

    if (!animcartaOponenteJugada.isActive()) {
      animcartaOponenteJugada.play();
    }
  }
}
