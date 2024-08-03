const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    category: {
        type:String,
        default:"Other"
    },
    name: {
        type:String,
        required:[true, "Please enter product name."],
        unique:true
    },
    brand: {
        type: String, //mongoose.Types.ObjectId,
        required:[true, "Please enter brand"]
    },
    hasSold: {
        type:Number,
        default:0
    },
    avgRating: {
        type:Number,
        default:0
    },
    inStock: {
        type:Number,
        default:1
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref:'Seller',
        required:[true, "Seller ID is needed"]
    },
    price: {
        type:Number,
        required:[true, "Please enter a price"]
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)



