const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});

const Contenedor = require('./classes/contenedor');
const contenedor = new Contenedor();

const productRouter = require('./routes/productRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('/public'));
app.use('/api/productos',productRouter);
app.use(cors());

//GETS
app.get('/',(req,res)=>{
    res.send('Bienvenidos a la app')
})

app.get('/api/productRandom', (req,res)=>{
    contenedor.getRandom().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
    
})

//POSTS
app.post('/api/productos',(req,res)=>{
    let pro = req.body;
    console.log(pro);
    contenedor.save(pro).then(result=>{
        res.send(result.prod)
        console.log(result.message);
        console.log(result);
    })
})