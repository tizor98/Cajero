const express = require("express");
const { dirname } = require("path");
const aplicacion = express();
const path = require("path");

//Primera URL
aplicacion.get("/", inicio);

aplicacion.use(express.static(__dirname));

function inicio(peticion, respuesta) {
    respuesta.sendFile(path.join(__dirname,"\cajero.html"));
}

//Inicia el servidor en el puerto 8989
const puerto = 8989;
aplicacion.listen(puerto);