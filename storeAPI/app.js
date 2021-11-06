require('dotenv').config() //to use .env variables 
require('express-async-errors') // to handle async errors
const productsRouter = require('./routes/products')

const express = require('express');
const app = express();
const connectDB = require('./db/connect')

//to handle req.body
app.use(express.json())

//to handle the routes
app.use('/api/v1/products',productsRouter)

//general errors (not found) and error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require('./middleware/error-handler')


app.get('/',(req, res)=>{
    res.send("<h1>Store Page</h1><a href='/api/v1/products'>products route</a>")
})

//middleware errors
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//connection to server and db
const port = process.env.PORT || 3000

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI) //dbConnection
        app.listen(port,()=>{
            console.log(`yes, my server is running on port: ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()