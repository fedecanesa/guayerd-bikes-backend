const mongoose = require("mongoose");

const recursoShema = new mongoose.Schema({
    title:String,
    imgUrl:String,
    link:String
});

module.exports = mongoose.model("Recurso", recursoShema);