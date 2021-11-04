//class to handle any kind of error
class CustomAPIError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

//function to create new instances of error handler
const createCustomError = (msg,statusCode) =>{
    return new CustomAPIError(msg,statusCode)
}

module.exports= {CustomAPIError, createCustomError}