const fs = require("fs");

class Contenedor {
  async saveProduct(productoAgregar) {
    try {
      let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
      let infoJson = JSON.parse(info);
      
      if (infoJson.some((i) => i.title === productoAgregar.title)) {
        return { 
          message: 'El producto '+ productoAgregar.title +' ya existe' };
      } else {
        let productos = {
          id: (infoJson.length + 1).toString(),
          title: productoAgregar.title,
          price: productoAgregar.price,
          image: productoAgregar.image,
        };

        infoJson.push(productos);
        
        try {
          await fs.promises.writeFile("../backend/files/products.txt", JSON.stringify(infoJson, null, 2));
          return { 
            message: "Producto agregado" };
        } catch (error) {
          return {
            message: "No se pudo agregar Producto " + error};
        }
      }
    } catch (error) {
      let productos = {
        id: "1",
        title: productoAgregar.title,
        price: productoAgregar.price,
        image: productoAgregar.image,
      };
      
      try {
        await fs.promises.writeFile("../backend/files/products.txt", JSON.stringify([productos]), null,2);
        return { prod:productos, message: "Producto agregado ya" };
      } catch (error) {
        return {
          message: "No se pudo agregar Producto " + error,
        };
      }
    }
  }
  async getById(id) {
    let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
    let infoJson = JSON.parse(info);
    let infoId = infoJson.find((i) => i.id === id);

    if (infoId) {
      return { product: infoId, message: "Id encontrado" };
    } else {
      return {
        message: "No se pudo encontrar Id ",
      };
    }
  }
  async getAll() {
    let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
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
    let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
    let infoJson = JSON.parse(info);
    let infoId = infoJson.filter((i) => i.id !== id);
    let infoIdEliminado = infoJson.filter((i) => i.id === id);

    if (infoJson.find((i) => i.id === id)) {
      await fs.promises.writeFile(
        "../backend/files/products.txt",
        JSON.stringify(infoId, null, 2)
      );
      return {
        product: infoIdEliminado,
        message: "Producto "+ id + " eliminado",
      };
    } else {
      return {
        product: infoId,
        message: "No existe producto para eliminar",
      };
    }
  }
  async getRandom() {
    let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
    let infoJson = JSON.parse(info);
    let idRandom = (Math.ceil(Math.random() * infoJson.length)).toString();

    let infoId = infoJson.filter((i) => i.id === idRandom);

    if (infoId) {
      return { product: infoId, message: "Id random encontrado" };
    } else {
      return {
        message: "No se pudo aencontrar Id ",
      };
    }

  }
  async deleteAll() {
    let info = await fs.promises.readFile("../backend/files/products.txt", "utf-8");
    let infoJson = JSON.parse(info);

    if (infoJson !== []) {
      fs.promises.writeFile(
        "../files/products.txt",
        JSON.stringify((infoJson = []), null, 2)
      );
      return {
        message: "Todos los productos fueron eliminados",
      };
    }
  }

//   async updatePet(id,body){
//     try{
//         let info = await fs.promises.readFile('../backend/files/products.txt','utf-8');
//         let infoJson = JSON.parse(data);
//         if(!infoJson.some(product=>product.id===id)) return {status:"error", message:"No hay mascotas con el id especificado"}
//         let result = infoJson.map(product>{
//             if(product.id===id){
//                 if(product.adopted){
//                     body = Object.assign(body)
//                     body = Object.assign({id:product.id,...body});
//                     return body;
//                 }
//                 else{
//                     body = Object.assign(body,{adopted:false})
//                     body = Object.assign({id:id,...body})
//                     return body;
//                 }
//             }else{
//                 return pet;
//             }
//         })
//         try{
//             await fs.promises.writeFile('../backend/files/products.txt',JSON.stringify(result,null,2));
//             return {status:"success", message:"Mascota actualizada"}
//         }catch{
//             return {status:"error", message:"Error al actualizar la mascota"}
//         }
//     }catch(error){
//         return {status:"error",message:"Fallo al actualizar la mascota: "+error}
//     }
// }
}

module.exports = Contenedor;
