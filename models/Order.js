const mongoose = require('mongoose')

const Product = require('./Product')

const OrderSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter user ID."]
    },
    product: {
        type:mongoose.Types.ObjectId,
        required:[true, "Please enter product ID."],
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