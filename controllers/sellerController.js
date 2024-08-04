const Seller = require('../models/Seller')
const Product = require('../models/Product')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customError')

const getAllSellers = async (req, res) => {
    const sellers = await Seller.find({})
    if(!sellers){
        throw new CustomError('Seller not found.')
    }
    res.status(StatusCodes.OK).json( {sellerCount: sellers.length, sellers} )
}

const getSeller = async (req, res) => {
    const {
        params: {id: sellerId},
    } = req

    const seller = await Seller.findOne({_id: sellerId}).lean()
    if(!seller){
        throw new CustomError('Seller does not exist')
    }

    const products = await Product.find({ 'seller': sellerId });       //get products the seller is selling
    seller.products = products
    res.status(StatusCodes.OK).json({seller})
}

const updateSeller = async (req, res) => {
    const {
        params: {id: sellerId},
    } = req

    const seller = await Seller.findByIdAndUpdate(
        {_id: sellerId},
        req.body,
        {new: true}
    )

    if(!seller){
        throw new CustomError('Seller does not exist')
    }

    res.status(StatusCodes.OK).json({ seller })
}

const createSeller = async (req, res) => {
    const seller = await Seller.create(req.body)
    if(!seller){
        throw new CustomError('Could not create seller')
    }
    res.status(StatusCodes.CREATED).json( {seller} )
}

const deleteSeller = async (req, res) => {
    const {
        params: {id: sellerId},
    } = req

    const seller = await Seller.findByIdAndDelete({_id:sellerId})

    if(!seller){
        throw new CustomError('Seller does not exist')
    }
    res.status(StatusCodes.OK).json( {msg: "Seller successfully deleted"})
}

module.exports = {
    getAllSellers,
    getSeller,
    updateSeller,
    createSeller,
    deleteSeller
}