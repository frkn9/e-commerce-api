const express = require('express')
const router = express.Router()

const { 
    getOrder,
    updateOrder,
    createOrder,
    deleteOrder,
    getAllOrders
} = require('../controllers/orderController')

router.route('/:id').get(getOrder).patch(updateOrder).delete(deleteOrder)
router.route('/').post(createOrder).get(getAllOrders)

module.exports = router