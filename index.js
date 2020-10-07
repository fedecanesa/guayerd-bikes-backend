const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Recurso = require("./models/Recurso.js");
const User = require("./models/User.js");
const Producto = require("./models/Producto.js");
const Consulta = require("./models/Consulta.js");
const Descuento = require("./models/Descuento.js");

//APP
const app = express();

//CONFIGURACION
app.set("port", process.env.PORT || 3000);
const DOMINIO = "slkdjflksdjf";


//MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//RUTAS------------------------------------------------------------------------------------

//getUrl
app.get("/getUrl", (req,res)=> {

    res.status(200).send({url:DOMINIO});

});

//getHomeBanner
app.get("/getHomeBanner", (req,res)=> {
    
    Recurso.findById("5f7e0f09a6fb8fb302b98a41")
    .then(banner=> {    if(!banner) return res.status(404).send({err:"Not found"});
        res.status(200).send(banner);
    })
    .catch(err=> {
        res.status(400).send({err:"Error 400"});
    });

});


//userData
app.post("/userData", (req,res)=> {

    const doc = new User({
        ...req.body
    });

    doc.save()
    .then(user=> {
        res.status(200).send(user);
    })
    .catch(err=> {
        res.status(400).send({err:"Error 400"});
    });

});

//productList
app.get("/productList", (req,res)=> {

    Producto.find()
    .then(productos=> {     if(productos.length==0) return res.status(200).send({message:"No hay productos disponibles"});
        res.status(200).send(productos);
    })
    .catch(err=> {
        res.status(400).send({err:"Error 400"});
    });

});

app.post("/cargar", (req,res)=> {

    const doc = new Producto({
        ...req.body
    });

    doc.save()
    .then(producto=> {
        res.send(producto);
    });

});

//submitForm
app.post("/submitForm", (req,res)=> {

    const doc = new Consulta({
        ...req.body
    });

    doc.save()
    .then(consulta=> {
        res.status(200).send(consulta);
    })
    .catch(err=> {
        res.status(400).send({err:"Error 400"});
    });

});

//getCoupon
app.get("/getCoupon", (req,res)=> {

    Descuento.findById("5f7e453e33cbb1dd47cfba50")
    .then(cupon=> {     if(!cupon) return res.status(404).send({err:"Not found"});
        res.status(200).send(cupon);
    })
    .catch(err=> {
        res.status(400).send({err:"Error 400"});
    });

});


//BASE DE DATOS Y SERVER
const URL_DATABASE = "mongodb+srv://root:toor@cluster0.mbevg.mongodb.net/guayerd-bikes?retryWrites=true&w=majority";

mongoose.connect(URL_DATABASE, {useNewUrlParser:true, useUnifiedTopology:true} , err=> {

    if(err) {
        console.log("No se pudo establecer una conexion con la base de datos");
    }
    else {

        console.log("Base de datos conectada");

        app.listen(app.get("port"), ()=> {
            console.log("Servidor levantado");
        });
        
    }

});









