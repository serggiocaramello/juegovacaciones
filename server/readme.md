Readme de la capa server

Autores: Ephie + Icaeth

Estado del proyecto:

Realizado:

- Manipulación de Arrays
- Creación de Endpoints

En ejecución:

- Integración de WebRTC
- Servicio de mensajería
- Login de Jugadores

Por Realizar:

- Cookies para Jugadores

El servidor está programado en node.js v.14+

Tiene los siguientes paquetes integrados:

    "cors": "^2.8.5",
    "express": "^4.17.1",
    "lodash": "^4.17.20"
    "nodemon": "^2.0.7"

Descripción de archivos:

index.js: servidor de node.
.gitignore: archivo de exclusiones en la subida de git
cards.js: archivos de trabajo para arrays

archivos de prueba a ser excluidos del merge a producción:

client.js: archivo para testeos de capa cliente
index.html: archivo para testeo de funcionalidades para capa cliente
example.http: archivo de prueba para interacciones con capa rest
