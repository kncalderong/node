const express = require('express');
const app = express();
const tasks =  require("./routes/tasks.js")
const connectDB = require("./db/connect")
require("dotenv").config() // to handle .env variables
const notFound = require("./middleware/not-found.js")
const errorHandlerMiddleware = require('./middleware/error-handler.js') // to handle trycatch errors from the asyncfunction
const port =process.env.PORT || 3000

//middleware to handle req.body from json
app.use(express.json())

//middleware to call the frontend
app.use(express.static('./public'))

//to call the routes with its respective controllers
app.use("/api/v1/tasks", tasks)

//to handle url no founded
app.use(notFound)

//to handle trycatch errors  (alternative approach.. not mandatory)
app.use(errorHandlerMiddleware)

// to start the app sync with the db connection!!
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`yes, my server is running on port ${port}...`)
        });
    } catch (error) {
        console.log(error);
    }
}

start() 



//this are the objective routes that
//app.get('/api/v1/tasks')  this long route is for convention..
//app.post('/api/v1/tasks')
//app.get('/api/v1/tasks/:id')
//app.patch('/api/v1/tasks/:id')
//app.delete('/api/v1/tasks/:id')
