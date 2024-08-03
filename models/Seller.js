const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please enter product name."],
        unique:true
    },
    productsSold: {
        type:Number,
        default:0
    },
    avgRating: {
        type:Number,
        default:-1
    }
}, {timestamps:true})

module.exports = mongoose.model('Seller', SellerSchema)