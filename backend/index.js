const fs = require("fs");

class Contenedor {
  async save(product) {
    try {
      let info = await fs.promises.readFile("./products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      if (infoJson.some((i) => i.title === product.title)) {
        return { message: "El producto ya existe" };
      } else {
        let productos = {
          id: (infoJson.length + 1),
          title: product.title,
          price: product.price,
          image: product.image,
        };

        infoJson.push(productos);

        try {
          await fs.promises.writeFile(
            "./products.txt",
            JSON.stringify(infoJson, null, 2)
          );
          return {message: "Producto agregado" };
        } catch (error) {
          return {
            message: "No se pudo agregar Producto" + error,
          };
        }
      }
    } catch (error) {
      let productos = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      };
      try {
        await fs.promises.writeFile(
          "./products.txt",
          JSON.stringify([productos]),
          null,
          2
        );
        return { message: "Producto agregado" };
      } catch (error) {
        return {
          message: "No se pudo agregar Producto" + error,
        };
      }
    }
  }
  async getById(id) {
    let info = await fs.promises.readFile("./products.txt", "utf-8");
    let infoJson = JSON.parse(info);
    let infoId = infoJson.find((i) => i.id === id);

    if (infoId) {
      return {product: infoId, message: "Id encontrado" };
    } else {
      return {
        product: infoJson,
        message: "No se pudo aencontrar Id ",
      };
    }
  }
  async getAll() {
    let info = await fs.promises.readFile("./products.txt", "utf-8");
    let infoJson = JSON.parse(info);

    if (infoJson !== []) {
      return {
        product: infoJson,
        message: "Estos son todos los productos",
      };
    } else {
      return {
        product: "",
        message: "No se encontraron productos",
      };
    }
  }
  async deleteById(id) {
    let info = await fs.promises.readFile("./products.txt", "utf-8");
    let infoJson = JSON.parse(info);
    let infoId = infoJson.filter((i) => i.id !== id);

    if (infoJson.find((i) => i.id === id)) {
      await fs.promises.writeFile(
        "./products.txt",
        JSON.stringify(infoId, null, 2)
      );
      return {
        product: infoId,
        message: "Producto eliminado",
      };
    } else {
      return {
        product: infoId,
        message: "No existe producto para eliminar",
      };
    }
  }
  async deleteAll() {
    let info = await fs.promises.readFile("./products.txt", "utf-8");
    let infoJson = JSON.parse(info);

    if (infoJson !== []) {
      fs.promises.writeFile(
        "./products.txt",
        JSON.stringify((infoJson = []), null, 2)
      );
      return {
        message: "Todos los productos fueron eliminados",
      };
    }
  }
}

module.exports = Contenedor;
