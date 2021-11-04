const fs = require("fs");

class Contenedor {
  async save(product) {
    try {
      let info = await fs.promises.readFile("./products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      if (infoJson.some((i) => i.title === product.title)) {
        return { status: "error", message: "El producto ya existe" };
      } else {
        let productos = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        };

        infoJson.push(productos);

        try {
          await fs.promises.writeFile("./products.txt",JSON.stringify(infoJson, null, 2));
          return { status: "sucess", message: "Producto agregado" };
        } catch (error) {
          return {status: "error",message: "No se pudo agregar Producto" + error};
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
        await fs.promises.writeFile("./products.txt",JSON.stringify([productos]),null,2);
        return { status: "sucess", message: "Producto agregado" };
      } catch (error) {
        return {status: "error", message: "No se pudo agregar Producto" + error};
      }
    }
  }

  
  async getById(id) {
    try {
      let info = await fs.promises.readFile("./products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      let infoId = infoJson.find((i) => i.id === id);

      if (infoId) {
        // return {product: infoId, message: "Id encontrado", };
        return { status: "Succes", product: infoId, message: "Id encontrado" };
      } 
    
    } catch (error) {
    //   return {message: "No se pudo encontrar id",};
      return { status: "error", message: "No se pudo aencontrar Id " + error };
    }
  }
  async getAll() {
    try {
      let info = await fs.promises.readFile("./products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      let infoId = infoJson.map((product)=>product);

      if (infoId) {
        return { status: "Succes", product: infoId, message: "Estos son todos los productos" };
      }
    } catch (error) {
      return { status: "error", message: "No se pudo aencontrar" + error };
    }
  }
  async deleteById(id) {
    try {
      let info = await fs.promises.readFile("./products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      let infoId = infoJson.filter((i) => i.id !== id);

      if (infoId) {
        try {
            await fs.promises.writeFile("./products.txt",JSON.stringify(infoId, null, 2));
            return { status: "sucess", message: "Producto agregado" };
          }catch{
        return { status: "Succes", product: infoId, message: "El producto se elimino correctamente" };
    }
      }
    } catch (error) {
      return { status: "error", message: "No se pudo eliminar producto" + error };
    }
  }





  // deleteAll(){}
}

module.exports = Contenedor;
