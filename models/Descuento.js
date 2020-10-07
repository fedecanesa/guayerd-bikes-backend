const mongoose = require("mongoose");

const descuentoShema = new mongoose.Schema({
    text:String,
    discountPercentage:Number
});

module.exports = mongoose.model("Descuento", descuentoShema);