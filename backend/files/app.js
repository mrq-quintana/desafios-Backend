const Contenedor = require('../index');

const contenedor = new Contenedor();

contenedor.save(
                {
                title: 'Escuadra',                                                                                                                                 
                price: 123.45,                                                                                                                                     
                image: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png', 
                
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
        