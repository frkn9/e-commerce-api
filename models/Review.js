const mongoose = require('mongoose')


const ReviewSchema = new mongoose.Schema({
    product: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter product ID"]
    },
    comment: {
        type:String,
        minlength:1,
        maxlength:250
    },
    rating: {
        type:Number,
        default:null
    }
}, {timestamps:true})


module.exports = mongoose.model('Review', ReviewSchema)