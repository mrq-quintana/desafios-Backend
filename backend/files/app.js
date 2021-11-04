const Contenedor = require('../index');

const contenedor = new Contenedor();

// contenedor.save(
//                 {title:"L" , 
//                 price:"1500" , 
//                 image:"Ruta Imagen2" , 
//                 id:"4"}

//                 ).then(result=>{
//                 console.log(result.message);
//                 })

// contenedor.getById('3').then(result=>{
//         console.log(result.product)
//         console.log(result.message);
//     })
    
// contenedor.getAll().then(result=>{
//         console.log(result.message);
//         console.log(result.product)
//     })
        
// contenedor.deleteById('2').then(result=>{
//     console.log(result.message);
//     console.log(result.product)
//     })
        
contenedor.deleteAll().then(result=>{
    
        console.log(result.message);
    })    
        