const express = require('express');
const app = express();
const {products} = require('./data.js')

app.get('/', (req, res) => {
    //res.json([products])
    res.send('<h1>Home Page</h1><a href="/api/products">Products</a>')
})

app.get('/api/products', (req, res) => {
    //to only send info without description
    const newProducts = products.map((product)=>{
        const {id,name,image} = product
        return {id,name,image}
    })
    res.json(newProducts)
})

// params
app.get('/api/products/:productID',(req, res)=>{
    const {productID} = req.params
    const singleProduct = products.find((product)=>{ return product.id === Number(productID)})
    if(!singleProduct){
        return res.status(404).send("Product does not exist")
    }
    return res.json(singleProduct)
})

//query
app.get('/api/v1/query',(req, res)=>{
    const {search,limit} = req.query
    let sortedProducts = [...products]
   
    if(search){
  
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }
    if(limit){
        sortedProducts = sortedProducts.slice(0,+limit)
    }
    if(sortedProducts.length < 1){
       return res.status(200).send("no products matched your search") // always return a response that is above the last one
    }

    res.status(200).json(sortedProducts)
})

app.listen(5000,()=>{
    console.log("my api is running on 5000")
})