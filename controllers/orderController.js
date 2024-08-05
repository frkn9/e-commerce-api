const Order = require('../models/Order')
const Product = require('../models/Product')
const Seller = require('../models/Seller')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customError')
const { findById, findByIdAndUpdate } = require('../models/Review')

const getAllOrders = async(req, res) => {
    const orders = await Order.find({})
    if(!orders){
        throw new CustomError('Order not found.')
    }
    res.status(StatusCodes.OK).json( {ordersCount: orders.length, orders} )
}

const getOrder = async (req, res) => {
    const {
        params: {id: orderId},
    } = req

    const order = await Order.findOne({_id: orderId})
    if(!order){
        throw new CustomError('Order does not exist')
    }
    res.status(StatusCodes.OK).json({order})
}

const updateOrder = async (req, res) => {
    const {
        params: {id: orderId},
    } = req

    const order = await Order.findByIdAndUpdate(
        {_id: orderId},
        req.body,
        {new: true}
    )

    if(!order){
        throw new CustomError('Order does not exist')
    }

    res.status(StatusCodes.OK).json({order})
}

const createOrder = async (req, res) => {
    const order = await Order.create(req.body)
    if(!order){
        throw new CustomError('Could not create order')
    }

    const product = await Product.findOne({_id: order.product})
    const seller = await Seller.findOne({_id: product.seller}).lean()

    seller.productsSold = seller.productsSold + 1
    await Seller.findByIdAndUpdate({_id:seller._id}, seller)

    res.status(StatusCodes.CREATED).json( {order} )
}

const deleteOrder =  async(req, res) => {
    const {
        params: {id: orderId},
    } = req

    const order = await Order.findByIdAndDelete({_id:orderId})

    if(!order){
        throw new CustomError('Order does not exist')
    }
    res.status(StatusCodes.OK).json( {msg: "Order successfully deleted"})

}

module.exports = {
    getAllOrders,
    getOrder,
    updateOrder,
    createOrder,
    deleteOrder
} 