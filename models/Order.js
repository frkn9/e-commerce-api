const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter user ID."]
    },
    product: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter product ID."]
    },
    price: {
        type:Number,
        required:[true, "Please enter price"]
    },
    orderDate: {
        type:Date,
        default:Date.now
    },
    deliveredDate: {
        type:Date,
        default:null
    },
    isDelivered: {
        type:Boolean,
        default:false
    }
}, 
{timestamps:true}
)


module.exports = mongoose.model('Order', OrderSchema)