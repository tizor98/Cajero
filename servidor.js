const express = require("express");
const aplicacion = express();
const path = require("path");

//Primera URL
aplicacion.get("/", (request, reply) => reply.sendFile(path.join(__dirname,"\cajero.html")));

aplicacion.use(express.static(__dirname));

//Inicia el servidor en el puerto 8989
const puerto = 8989;
aplicacion.listen(puerto);