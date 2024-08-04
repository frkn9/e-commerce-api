const mongoose = require('mongoose')


const ReviewSchema = new mongoose.Schema({
    product: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter product ID"]
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