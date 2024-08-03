const express = require('express')
const router = express.Router()

const { 
    getSeller,
    updateSeller,
    createSeller,
    deleteSeller,
    getAllSellers
} = require('../controllers/sellerController')

router.route('/:id').get(getSeller).patch(updateSeller).delete(deleteSeller)
router.route('/').post(createSeller).get(getAllSellers)

module.exports = router