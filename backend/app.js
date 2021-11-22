const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>{
    console.log("Escuchando en puerto " + PORT)
});

const Contenedor = require('./src/classes/contenedor');
const contenedor = new Contenedor();

const productRouter = require('./src/routes/productRoute');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/public',express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Hora de petición: '+time.toTimeString().split(" ")[0]);
    next();
})
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null, Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage});

app.use('/api/productos',productRouter);


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

app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const files = req.files;
    res.send(files)
})
