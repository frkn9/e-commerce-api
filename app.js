require('dotenv').config()
require('express-async-errors') // error throwlandıgında uygulama çökmemesi için
require('process')
const connectDB = require('./db/connection')
connectDB(process.env.MONGO_URI)
port = process.env.PORT

const express = require('express')
const app = express()

const productRouter = require('./routers/productRouter')
const sellerRouter = require('./routers/sellerRouter')
const authRouter = require('./routers/authRouter')
const orderRouter = require('./routers/orderRouter')
const reviewRouter = require('./routers/reviewRouter')

const routeNotFound = require('./middleware/routeNotFound')
const errorHandler = require('./middleware/errorHandler')

app.use(express.json())
app.use('/api/v1/product', productRouter)
app.use('/api/v1/seller', sellerRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/review', reviewRouter)

app.use(errorHandler)
app.use(routeNotFound)

const start = () => {
    try{
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start()


