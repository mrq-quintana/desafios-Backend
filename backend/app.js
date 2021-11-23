import express from 'express';
import cors from 'cors';
import upload from './src/service/upload.js';
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});
import Contenedor from './src/classes/contenedor.js';
const contenedor = new Contenedor();
import products from './src/routes/products.js';


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/imagenes',express.static('/public'));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Hora de petición: '+time.toTimeString().split(" ")[0]);
    next();
})
app.use('/api/productos',products);


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

//POST
app.post('/api/uploadfile',upload.single('img'),(req,res)=>{
    const files = req.file; 
    console.log(files);
    if(!files||files.length === 0){
        res.status(500).send({message: 'Error al subir archivo'})
    }
    res.send(files)
})
