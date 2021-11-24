import express from 'express';
import cors from 'cors';
import upload from './src/service/upload.js';
import {engine} from 'express-handlebars';
import Contenedor from './src/classes/contenedor.js';
import products from './src/routes/products.js';
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});
const contenedor = new Contenedor();

app.engine('handlebars', engine());
app.set('views','./viewsHandlebars');
app.set('views engine','handlebars');
app.set('views','./viewsPug');
app.set('views engine','pug');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Hora de petición: '+time.toTimeString().split(" ")[0]);
    next();
})
app.use(express.static('public'));
app.use('/api/productos',products);

//GET
app.get('/api/productRandom', (req,res)=>{
    contenedor.getRandom().then((result)=>{
        res.send(result.product);
        console.log(result.message);
    })
    
})
app.get('/viewHandlebars/products',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.product;
        let preparedObject ={
            products : info
        }
        res.render('products',preparedObject)
    })
})
app.get('/viewPug/products',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.product;
        res.render('products',info)
    })
})

//POST
app.post('/api/uploadfile',upload.single('image'),(req,res)=>{
    const files = req.file; 
    console.log(files);
    if(!files||files.length === 0){
        res.status(500).send({message: 'Error al subir archivo'})
    }
    res.send(files)
})

