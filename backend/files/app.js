const Contenedor = require('../index');

const contenedor = new Contenedor();


contenedor.save(
                            {title:"Lupu" , 
                            price:"1500" , 
                            image:"Ruta Imagen2" , 
                            id:"3"}

                            ).then(result=>{
                            console.log(result.message);
                            })

contenedor.getById('2').then(result=>{
    console.log(result.product)
    console.log(result.message);
})

contenedor.getAll().then(result=>{
    console.log(result.message);
    console.log(result.product)
})


contenedor.deleteById('3').then(result=>{
    console.log(result.message);
    console.log(result.product)
})