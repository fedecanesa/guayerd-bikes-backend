const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const Recurso = require("./models/Recurso.js");
const User = require("./models/User.js");
const Producto = require("./models/Producto.js");

//APP
const app = express();

//CONFIGURACION
app.set("port", process.env.PORT || 3000);


//MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//RUTAS------------------------------------------------------------------------------------

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









