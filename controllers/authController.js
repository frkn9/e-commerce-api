
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
    CustomError
} = require('../errors/customError')


const login = async(req, res) => {

    const { email, password } = req.body
    
    if(!email || !password){
        throw new CustomError('Please provide email and password')
    }

    const user = await User.findOne( {email} )
    if(!user){
        throw new CustomError('Invalid email')
    }
    const isPasswordCorrect = await user.comparePasswords(password)

    if(!isPasswordCorrect){
        throw new CustomError('Wrong password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: {name: user.username, email: user.email, id: user._id},  token})
}

const registerUser = async(req, res, next) => {
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json( {user: {username: user.username, email: user.email }, token:token})
}

const getAllUsers = async (req, res) => {
    const users = await User.find( {} ).select('username email')
    res.status(StatusCodes.OK).json( {users} )
}



module.exports = {
    registerUser,
    getAllUsers,
    login
}