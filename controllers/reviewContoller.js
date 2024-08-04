const Review = require('../models/Review')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/customError')

const getAllReviews = async (req, res) => {
    const reviews = await Review.find({})
    if(!reviews){
        throw new CustomError('Review not found.')
    }
    res.status(StatusCodes.OK).json( {reviewCount: reviews.length, reviews} )
}

const getReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const review = await Review.findOne({_id: reviewId})
    if(!review){
        throw new CustomError('Review does not exist')
    }
    res.status(StatusCodes.OK).json({review})
}

const updateReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const review = await Review.findByIdAndUpdate(
        {_id: reviewId},
        req.body,
        {new: true}
    )

    if(!review){
        throw new CustomError('Review does not exist')
    }

    res.status(StatusCodes.OK).json({ review })
}

const createReview = async (req, res) => {
    const review = await Review.create(req.body)
    if(!review){
        throw new CustomError('Could not create review')
    }
    res.status(StatusCodes.CREATED).json( {review} )
}

const deleteReview = async (req, res) => {
    const {
        params: {id: reviewId},
    } = req

    const review = await Review.findByIdAndDelete({_id:reviewId})

    if(!review){
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