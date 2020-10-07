const mongoose = require("mongoose");

const productoShema = new mongoose.Schema({
    title:String,
    description:String,
    imgUrl:String,
    inStock:Number,
    price:Number,
    currency:String,
    discountPrice: Number
});

module.exports = mongoose.model("Producto", productoShema);