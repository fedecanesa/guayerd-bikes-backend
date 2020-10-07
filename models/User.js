const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    token:String,
    name:String,
    email:String,
    sendEmail:Boolean
});

module.exports = mongoose.model("User", userShema);