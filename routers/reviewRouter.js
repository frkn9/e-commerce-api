const express = require('express')
const router = express.Router()

const { 
    getReview,
    updateReview,
    createReview,
    deleteReview,
    getAllReviews
} = require('../controllers/reviewContoller')

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview)
router.route('/').post(createReview).get(getAllReviews)

module.exports = router