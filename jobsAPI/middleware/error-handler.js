const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  
  //new error to handler mongoDB errors
  let customError = {
    //default values
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong, please try again later"
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  //if match with validation error
  if(err.name === "ValidationError"){
    //this will extract the error messages from mongoose
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(",") 
    customError.statusCode = 400
  }

  //if match with duplicate mongoDB error
  if(err.code && err.code === 11000){
    customError.statusCode = 400
    customError.msg = `This email is already being used, please choose another value`
  }

  //if match with cast error 
  if(err.name === "CastError"){
    customError.msg = `No item found with id: ${err.value}`
    customError.statusCode = 400
  }

  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({ msg:customError.msg })
}

module.exports = errorHandlerMiddleware
