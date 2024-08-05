const Review = require('../models/Review')
const Product = require('../models/Product')
const { updateProduct } = require('../controllers/productController')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customError')

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({user:req.user.userId})
    if(!reviews){
        throw new CustomError('Review not found.')
    }
    res.status(StatusCodes.OK).json( {reviewCount: reviews.length, reviews} )
}

const getReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const review = await Review.findOne({_id: reviewId, user:req.user.userId})
    if(!review){
        throw new CustomError('Review does not exist')
    }
    res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const product = await Product.findOne({_id: req.body.product}).lean()
    if(!product){
        throw new CustomError("User doesn't have an existing review on this product")
    }

    const oldReview = await Review.findOne({_id:reviewId}).lean()

    const review = await Review.updateOne(
        {_id: reviewId, user:req.user.userId},
        req.body,
        {new: true}
    )

    if(!review){
        throw new CustomError('Review does not exist')
    }

    
    const newRating = (req.body.rating - oldReview.rating + (product.avgRating*product.amountRatings)) / (product.amountRatings)
    product.avgRating = newRating
    const newProduct = await Product.updateOne({_id:product._id}, product, {new:true})

    if(!newProduct){
        throw new CustomError('Could not update product rating')
    }

    res.status(StatusCodes.OK).json({ msg: "Review updated" })
}

const createReview = async (req, res) => {
    req.body.user = req.user.userId
    const review = await Review.create(req.body)
    if(!review){
        throw new CustomError('Could not create review')
    }

    // update product reviewCount, amountRatings, avgRating upon review creation
    const product = await Product.findOne({_id: req.body.product}).lean()
    const newRating = (req.body.rating + (product.avgRating*product.amountRatings)) / (product.amountRatings + 1)
    product.avgRating = newRating
    product.amountRatings = product.amountRatings + 1
    const newProduct = await Product.updateOne({_id:product._id}, product, {new:true})
    if(!newProduct){
        throw new CustomError('Could not update product rating')
    }

    res.status(StatusCodes.CREATED).json( {review} )

    /* const product = await Product.findByIdAndUpdate(
        {_id: productId},
        req.body,
        {new: true}
    ) */

}

const deleteReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const review = await Review.findOne({_id: reviewId, user:req.user.userId}).lean()
    if(!review){
        throw new CustomError('Review does not exist')
    }

    // update product reviewCount, amountRatings, avgRating upon review deletion
    const product = await Product.findOne({_id: review.product}).lean()
    const newRating = ((product.avgRating*product.amountRatings) - review.rating) / (product.amountRatings - 1)
    product.avgRating = newRating
    product.amountRatings = product.amountRatings - 1
    console.log(newRating, review.rating, product.amountRatings)
    const newProduct = await Product.updateOne({_id:product._id}, product, {new:true})
    if(!newProduct){
        throw new CustomError('Could not update product rating')
    }

    const _review = await Review.deleteOne({_id: reviewId, user:req.user.userId})
    if(_review.deletedCount == 0){
        throw new CustomError('Review does not exist')
    }

    res.status(StatusCodes.OK).json( {msg: "Review successfully deleted"})
}

module.exports = {
    getAllReviews,
    getReview,
    updateReview,
    createReview,
    deleteReview
}