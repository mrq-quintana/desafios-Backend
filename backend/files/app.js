const Contenedor = require('../classes/index');

const contenedor = new Contenedor();

contenedor.save(
                {
                    title: 'Globo Terráqueo',                                                                                                                          
                    price: 345.67,                                                                                                                                     
                    image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
                    
                }

                ).then(result=>{
                console.log(result.message);
                })


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
        
// contenedor.deleteAll().then(result=>{ 
//         console.log(result.message);
//     })    
// contenedor.getRandom().then(result=>{
//             console.log(result.product)
//             console.log(result.message);
//         })