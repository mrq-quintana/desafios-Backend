const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});

const Contenedor = require('../backend/classes/index');
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
    let product = req.body;
    // console.log(product);
    contenedor.save(product).then(result=>{
        res.send(result.message)
        console.log(result.message);
    })
})