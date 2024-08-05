const mongoose = require('mongoose')
const Product = require('./Product')

const ReviewSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter user ID."],
    },
    product: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter product ID"],
        validate: {
            validator: async function(val) {
                const product = await Product.findOne({_id:val})
                if(!product){
                    return false
                }
                return true
            },
            message: "Product does not exist"
        } 
    },
    comment: {
        type:String,
        minlength:1,
        maxlength:250,
        required:[true, "Please enter a comment"]
    },
    rating: {
        type:Number,
        default:null,
        min:0,
        max:5,
        validate: {
            validator: Number.isInteger,
            message: "rating is not an integer value"
        }
    }
}, {timestamps:true})



module.exports = mongoose.model('Review', ReviewSchema)