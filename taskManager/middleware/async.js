const asyncWrapper =  (fn) =>{
    return async (req,res,next) =>{
        try {
            await fn(req,res,next) // the function passed as argument is executed here
        } catch (error) {
            next(error) // handled by the next middleware
        }
    }
}
module.exports = asyncWrapper