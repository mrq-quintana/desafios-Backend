const express = require('express');
const router = express.Router();
const Contenedor = require('../classes/contenedor');
const contenedor = new Contenedor();


router.get('/', (req,res)=>{
    contenedor.getAll().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})

router.get('/:id', (req,res)=>{
    const usuarioId = req.params.id;
    contenedor.getById(usuarioId).then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})

router.post('/',(req, res)=>{

    let p = req.body;
    console.log(p); //Viene vacio

    contenedor.saveProduct(p).then(result=>{
        res.send(result)
        console.log(result.message);
        console.log(result.prod);
    })
})

module.exports = router;