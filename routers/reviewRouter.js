const express = require('express')
const router = express.Router()

const { 
    getRouter,
    updateRouter,
    createRouter,
    deleteRouter,
    getAllRouters
} = require('../controllers/routerController')

router.route('/:id').get(getRouter).patch(updateRouter).delete(deleteRouter)
router.route('/').post(createRouter).get(getAllRouters)

module.exports = router