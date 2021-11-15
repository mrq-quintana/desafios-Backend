const express = require('express');
const Contenedor = require('../backend/classes/index');
const app = express();
const PORT = process.env.PORT||8080;

const contenedor = new Contenedor();

const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});


app.get('/',(req,res)=>{
    res.send('Bienvenidos a la app')
})

app.get('/productos',(req,res)=>{
    contenedor.getAll().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})

app.get('/productos/:id', (req,res)=>{
    const usuarioId = req.params.id;
    contenedor.getById(usuarioId).then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
})
app.get('/productRandom', (req,res)=>{
    contenedor.getRandom().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
    
})