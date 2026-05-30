const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const rutaCandidatos = path.join(__dirname, "data", "candidatos.json");
const rutaVotos = path.join(__dirname, "data", "votos.json");

function leerVotos() {
  const data = fs.readFileSync(rutaVotos, "utf8");
  return JSON.parse(data);
}

function guardarVotos(votos) {
  fs.writeFileSync(rutaVotos, JSON.stringify(votos, null, 2));
}

function leerCandidatos() {
  const data = fs.readFileSync(rutaCandidatos, "utf8");
  return JSON.parse(data);
}

function guardarCandidatos(candidatos) {
  fs.writeFileSync(rutaCandidatos, JSON.stringify(candidatos, null, 2));
}

app.get("/api/candidatos", function (req, res) {
  const candidatos = leerCandidatos();
  res.json(candidatos);
});

app.post("/api/candidatos", function (req, res) {
  const nuevoCandidato = {
    id: Date.now(),
    nombre: req.body.nombre,
    rol: req.body.rol,
    propuesta: req.body.propuesta,
    estado: "Perfil de práctica académica"
  };

  if (!nuevoCandidato.nombre || !nuevoCandidato.rol || !nuevoCandidato.propuesta) {
    return res.status(400).json({
      mensaje: "Faltan datos obligatorios"
    });
  }

  const candidatos = leerCandidatos();
  candidatos.push(nuevoCandidato);
  guardarCandidatos(candidatos);

  res.status(201).json({
    mensaje: "Perfil guardado correctamente",
    candidato: nuevoCandidato
  });
});

app.post("/api/votos", function (req, res) {
  const identificacion = req.body.identificacion;
  const candidato = req.body.candidato;

  if (!identificacion || !candidato) {
    return res.status(400).json({
      mensaje: "Faltan datos obligatorios para el voto"
    });
  }

  const nuevoVoto = {
    id: Date.now(),
    identificacion,
    candidato,
    fecha: new Date().toISOString()
  };

  const votos = leerVotos();
  votos.push(nuevoVoto);
  guardarVotos(votos);

  res.status(201).json({
    mensaje: "Voto registrado correctamente",
    voto: nuevoVoto
  });
});

app.listen(PORT, function () {
  console.log("Servidor funcionando en http://localhost:" + PORT);
});
