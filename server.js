const express = require("express");
const Contenedor = require("./Contenedor");

const PORT = 8080;

const app = express();

const contenedor = new Contenedor("./productos.txt");

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto " + PORT);
});

//Get Productos
app.get("/", (req, res) => {
  let productos = contenedor.getAll();
  res.send("Productos: " + productos);
});

//Get Producto Random
app.get("/productosRandom", (req, res) => {
  let obj = contenedor.getRandom();
  res.send("Producto Random: " + obj);
});
