const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors") //no need to specify index

const authenticationMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization //to access that token provided by the user trying to loginUser
    if(!authHeader || !authHeader.startsWith('Bearer ')){ //here is where I can control the access
        throw new UnauthenticatedError("no token provided")
    }
    const token = authHeader.split(" ")[1]

    try {
         //this will return the original payload object provided on the login
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username}
        next() // to continue on the next function (dashboard)
    } catch (error) {
        throw new UnauthenticatedError("not authrized to access this route")
    }
}

module.exports =authenticationMiddleware