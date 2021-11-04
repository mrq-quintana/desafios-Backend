const fs = require('fs');

class Contenedor{
    
            async crearProductList(product){
                try {
                    let info = await fs.promises.readFile('./products.txt','utf-8')
                    let infoJson = JSON.parse(info);
                    if (infoJson.some(i=>i.title===product.title)){
                        return{status:"error", message:"El producto ya existe"}
                    }else{
                        
                        let productos = {
                            id:product.id,
                            title: product.title,
                            price: product.price,
                            image: product.image,
                    }

                    infoJson.push(productos);

                    try {
                        await fs.promises.writeFile('./products.txt', JSON.stringify(infoJson, null,5));
                        return {status:"sucess",message:"Producto agregado"}
                    } catch(error) {
                        return {status:"error", message:"No se pudo agregar Producto" + error}
                    }
                }
                } catch (error) {
                    let productos = {
                        id:product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                    }
                    try{
                        await fs.promises.writeFile('./products.txt', JSON.stringify([productos]),null,2);
                        return {status:"sucess",message:"Producto agregado"}
                    }catch(error){
                        return{status:"error", message:"No se pudo agregar Producto" + error}
                    }
                }
            }
    
    // save(objet){}
    async getById(id){
        try {
            let info = await fs.promises.readFile('./products.txt','utf-8')
            let infoJson = JSON.parse(info);
            let infoId = infoJson.find(i=>i.id===id)

            if (infoId){
                return{status:"Succes", product:infoId,  message:"Id encontrado"}
            }
        }catch(error){
            return{status:"error", message:"No se pudo aencontrar" + error}
        }
    }
        async getAll(){
            try {
                let info = await fs.promises.readFile('./products.txt','utf-8')
                let infoJson = JSON.parse(info);
                let infoId = infoJson.map(function(prod){
                    return prod;
                  });
    
                if (infoId){
                    return{status:"Succes", product:infoId,  message:"Id encontrado"}
                }
            }catch(error){
                return{status:"error", message:"No se pudo aencontrar" + error}
            }
        }
            async deleteById(id){
                try {
                    let info = await fs.promises.readFile('./products.txt','utf-8')
                    let infoJson = JSON.parse(info);
                    let infoId = infoJson.filter(i=>i.id!==id)
        
                    if (infoId){
                        return{status:"Succes", product:infoId,  message:"Id encontrado"}
                    }
                }catch(error){
                    return{status:"error", message:"No se pudo aencontrar" + error}
                }
            }
  
    
    // deleteAll(){}

        
    
}

module.exports = Contenedor;