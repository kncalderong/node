const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({})
    res.status(200).json({products})
}

const getAllProducts = async (req,res) =>{
    //extract all categories that I really can filter (ignoring those that are no related to my database)
    const {featured,company,name,sort,fields,numericFilters} = req.query 
    const queryObject = {}

    /** BAsic Filtering **/
    if(featured){
        queryObject.featured = featured === "true"? true: false //pass String as Boolean
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex:name,$options:"i"} //if includes that word or even only letters
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match)=> `-${operatorMap[match]}-`) //to replace that symbol for its corresponding letters
        const options = ["price","rating"]
        filters = filters.split(",").forEach((item)=>{
            const [field,operator,value] = item.split("-") //this is like a label of the array and
            if(options.includes(field)){ //verify options available
                queryObject[field] = {[operator]:Number(value)} //structure of the desired object
            }
        })
    }    

    let result  =  Product.find(queryObject) // to search based on any query from the request

    /** BAsic chaining search **/
    //sort    
    if(sort){
        const sortList = sort.split(',').join(' ') //to convert commas into spaces
        result = result.sort(sortList) 
    } else {
        result = result.sort("createdAt") //default value sorting
    }
    //select
    if(fields){
        const sortFields = fields.split(',').join(' ')
        result = result.select(sortFields) // I'll only see this info
    }

    /**Pagination effect**/
    const page = Number(req.query.page) || 1 //default first page
    const limit = Number(req.query.limit) || 10 // n° of items on each page
    const skip = (page - 1) * limit  //to skip those items until reach the desired "page"    
    result = result.skip(skip).limit(limit)
    
    const products = await result //oficcially make the request
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}