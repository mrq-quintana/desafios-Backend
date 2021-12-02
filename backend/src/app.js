import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import upload from './service/upload.js';
import Contenedor from './classes/contenedor.js';
import products from './routes/products.js';
import __dirname from './utils.js';
import {Server} from 'socket.io'

const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});
const contenedor = new Contenedor();

export const io = new Server(server);

app.engine('handlebars', engine());
app.set('views',__dirname+'/viewsHandlebars');
app.set('view engine','handlebars');
// app.set('views','./viewsEjs');
// app.set('view engine','ejs')
// app.set('views','./viewsPug');
// app.set('view engine','pug')
app.set('views','./viewsEjs');
app.set('view engine','ejs')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname+'/public'));
app.use('/api/productos',products);
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Hora de petición: '+time.toTimeString().split(" ")[0]);
    next();
})

//GET
app.get('/api/productRandom', (req,res)=>{
    contenedor.getRandom().then((result)=>{
        res.send(result.product);
        console.log(result.message);
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


//Handlebars
app.get('/views/articulos/handlebars',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.product;
        console.log(info);
        let infoObj ={
            productos:info
        }
        console.log(infoObj);
        res.render('articulos',infoObj)
    })
})

//Pug
// app.get('/views/articulos/pug',(req,res)=>{
//     contenedor.getAll().then(result=>{
//         let info = result.product;
//         let infoObj ={
//             productos:info
//             }
//         res.render('articulos',infoObj)
//     })
// })

//Ejs
// app.get('/views/articulos/ejs',(req,res)=>{
//     contenedor.getAll().then(result=>{
//         let info = result.product;
//         let infoObj ={
//             title:info.title,
//             price:info.price,
//             description:info.description,
//             thumbnail:info.thumbnail

//             }
//         res.render('articulos.ejs',infoObj)
//     })
// })

//Socket
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await contenedor.getAll();
    socket.emit('actualiza', products);
    
})


