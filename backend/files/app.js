const Contenedor = require('../index');

const contenedor = new Contenedor();


contenedor.crearProductList(
                            {title:"Lupanocho" , 
                            price:"1500" , 
                            image:"Ruta Imagen2" , 
                            id:"4"}

                            ).then(result=>{
                            console.log(result.message);
                            })

contenedor.getById('4').then(result=>{

    console.log(result.product)
})

contenedor.getAll().then(result=>{

    console.log(result.product)
})


contenedor.deleteById('3').then(result=>{

    console.log(result.product)
})