const express = require('express');
const router = express.Router();
const upload = require('../service/upload')
const Contenedor = require('../classes/contenedor');
const contenedor = new Contenedor();

//GET
router.get('/', (req,res)=>{
    contenedor.getAll().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})

router.get('/:id', (req,res)=>{
    const usuarioId = parseInt(req.params.id);
    contenedor.getById(usuarioId).then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})
//POST
router.post('/',(req, res)=>{
    let productoAgregar = req.body;
    contenedor.saveProduct(productoAgregar).then(result=>{
        res.send(result)
        console.log(result.message);
    })
})

//DELETE
router.delete('/:id', (req,res)=>{
    const usuarioId = parseInt(req.params.id);
    contenedor.deleteById(usuarioId).then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})

//PUT
router.put('/:pid',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
        console.log(result.message);
    })
})

module.exports = router;