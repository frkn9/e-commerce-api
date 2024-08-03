const express = require('express')
const router = express.Router()

const { 
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    getAllProducts
} = require('../controllers/productController')

router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)
router.route('/').post(createProduct).get(getAllProducts)

module.exports = router