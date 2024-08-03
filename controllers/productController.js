const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customError')

const getAllProducts = async (req, res) => {
    const products = await Product.find({})
    if(!products){
        throw new CustomError('Product not found.')
    }
    res.status(StatusCodes.OK).json( {productsCount: products.length, products} )
}

const getProduct = async (req, res) => {
    const {
        params: {id: productId},
    } = req

    const product = await Product.findOne({_id: productId})
    if(!product){
        throw new CustomError('Product does not exist')
    }
    res.status(StatusCodes.OK).json({product})
}

const updateProduct = async (req, res) => {
    const {
        params: {id: productId},
    } = req

    const product = await Product.findByIdAndUpdate(
        {_id: productId},
        req.body,
        {new: true}
    )

    if(!product){
        throw new CustomError('Product does not exist')
    }

    res.status(StatusCodes.OK).json({product})
}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    if(!product){
        throw new CustomError('Could not create product')
    }
    res.status(StatusCodes.CREATED).json( {product} )
}

const deleteProduct = async (req, res) => {
    const {
        params: {id: productId},
    } = req

    const product = await Product.findByIdAndDelete({_id:productId})

    if(!product){
        throw new CustomError('Product does not exist')
    }
    res.status(StatusCodes.OK).json( {msg: "Product successfully deleted"})

}


module.exports = {
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    getAllProducts
} 