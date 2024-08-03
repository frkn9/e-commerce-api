const express = require('express')
const router = express.Router()
const {registerUser, getAllUsers, login} = require('../controllers/authController')

router.route('/register').post(registerUser)
router.route('/').get(getAllUsers)
router.route('/login').post(login)


module.exports = router