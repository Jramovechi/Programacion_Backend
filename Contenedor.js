const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.archivo, "utf-8", 2);
      return JSON.parse(objs);
    } catch (err) {
      return err;
    }
  }

  async save(obj) {
    try {
      const objs = await this.getAll();
      let newId = 1;

      if (objs.length > 0) {
        newId = objs[objs.length - 1].id + 1;
      }

      const newObj = { ...obj, id: newId };
      objs.push(newObj);

      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(objs, null, 2),
        (err) => {
          if (err) {
            console.log("Error al crear Archivo", err);
          } else {
            console.log("El archivo se creo exitosamente");
            return newId;
          }
        }
      );
    } catch (err) {
      return err;
    }
  }

  getById(idProd) {
    try {
      fs.readFile(this.archivo, "utf-8", (err, data) => {
        let jsonData = JSON.parse(data);
        let idSeleccionado = jsonData.find((item) => item.id === idProd);
        console.log(idSeleccionado);
        if (idSeleccionado !== undefined) {
          console.log("el ID es: ", idSeleccionado);
        }
      });
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      let file = await fs.promises.readFile(this.archivo, "utf-8");
      let objects = JSON.parse(file);
      let filtered = objects.filter(function (object) {
        return object.id != id;
      });
      await fs.promises.writeFile(
        this.archivo,
        JSON.stringify(filtered, null, 10)
      );
      console.log("DELETED ID");
    } catch (err) {
      return error;
    }
  }

  async deleteAll() {
    await fs.promises.writeFile(this.archivo, JSON.stringify([]), null, 2);
  }

  async getRandom() {
    try {
      const productos = await this.getAll();
      let random = Math.floor(Math.random() * productos.length);
      const rProduct = await productos[random];
      //console.log(rProduct)
      return rProduct;
    } catch (error) {
      return error;
    }
  }
}

let referencia = new Contenedor("./productos.txt");

let productos = [
  { name: "producto1", price: 1000, thumbnail: "foto1" },
  { name: "producto2", price: 2000, thumbnail: "foto2" },
  { name: "producto3", price: 3000, thumbnail: "foto3" },
];

async function createProductos(prods) {
  for (const prod of prods) {
    await referencia.save(prod);
  }
}

createProductos(productos);

referencia.getAll();
//referencia.getById(1);
//referencia.deleteById();
//referencia.deleteAll();

//Export a Servidor
module.exports = Contenedor;
