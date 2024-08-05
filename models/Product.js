const mongoose = require('mongoose')
const Seller = require('./Seller')

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
    amountRatings: {
        type:Number,
        default:0
    },
    avgRating: {
        type:Number,
        default:0
    },
    inStock: {
        type:Number,
        default:10
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref:'Seller',
        required:[true, "Seller ID is needed"],
        validate: {
            validator: async function(val) {
                const seller = await Seller.findOne({_id:val})
                if(!seller){
                    return false
                }
                return true
            },
            message: "Seller does not exist"
        }, 
    },
    price: {
        type:Number,
        required:[true, "Please enter a price"]
    }
}, {timestamps: true})


module.exports = mongoose.model('Product', ProductSchema)



