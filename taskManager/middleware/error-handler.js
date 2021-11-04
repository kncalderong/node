const {CustomAPIError} = require('../errors/custom-error.js')

const errorHandlerMiddleware = (err, req, res, next) =>{
    //to see if this error comes from the class created
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    } 
    return res.status(500).send({msg:err})
}
module.exports = errorHandlerMiddleware