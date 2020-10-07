const mongoose = require("mongoose");

const consultaShema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    subject:String,
    message:String
});

module.exports = mongoose.model("Consulta", consultaShema);