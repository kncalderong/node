const express = require('express');
const app = express()
const logger = require('./logger.js')
const authorize = require('./authorize.js')

//only works if a query is passed with user=jhon, because authorize middleware is invoqued always

//this is a middleware function and its in a separate file for a cleaner code
/* 
const logger = (req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear()

    console.log(method, url, time)
    next()
    //res.send("this was a middleware in action")
} */

//this will pass the middleware to all routes, if multiple middleware, place them inside an array (order inside array matters)
app.use([logger,authorize])

//middleware has to be invoqued in the middle, and ends the cycle with a response or uses next()
app.get('/', (req, res) => {
    res.send("home")
})

app.get('/about', (req, res) => {
    console.log(req.user)  //modified in the middleware { name: 'jhon', id: 3 }
    res.send("about")    
})

app.listen(5000,()=>{
    console.log("yes.. my server is running on port 5000")
})