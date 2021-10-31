
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static('./public'))

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./navbar-app/index.html')) //dirname points to the folder where app.js is
})

app.all("*", (req, res)=>{
    res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(5000,()=>{
    console.log("server is listening on port 5000");
})