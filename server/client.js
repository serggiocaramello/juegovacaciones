window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
    this.addEventListener(name, fn);
}
NodeList.prototype.__proto__ = Array.prototype;


let text = $(".mostrar")
let text1 = $(".mostrar1")
let text2 = $(".mostrar2")
let text3 = $(".mostrar3")
let text4 = $(".mostrar4")
let request = 1

let fetchie = function fetchie() { fetch('http://127.0.0.1:3000/cartas').then(res => res.json()).then(data => text.innerText = data) }
let fetchie1 = function fetchie() { fetch('http://127.0.0.1:3000/jugador1').then(res => res.json()).then(data => console.log(data)) }
let fetchie2 = function fetchie() { fetch('http://127.0.0.1:3000/jugador2').then(res => res.json()).then(data => text2.innerText = data) }
let fetchie3 = function fetchie() { fetch('http://127.0.0.1:3000/jugador3').then(res => res.json()).then(data => text3.innerText = data) }
let fetchie4 = function fetchie() { fetch('http://127.0.0.1:3000/jugador4').then(res => res.json()).then(data => text4.innerText = data) }


