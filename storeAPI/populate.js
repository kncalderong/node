require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() //to start always clean
        await Product.create(jsonProducts) // to insert this array of objects
        console.log("success!!")
        process.exit(0) //to end the process
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
start()