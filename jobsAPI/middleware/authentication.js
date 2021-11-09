const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require("../errors")

const auth = async(req,res,next) =>{

    //check headers
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('invalid authentication')
    }
    const token = authHeader.split(" ")[1]

    //try and catch to compare the token
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        //attach the info the the request
        req.user={
            userId:payload.userId,
            name:payload.name
        }
    /**Alternative way... you can access here to the db and exctract the needed info**/
        //const user = User.findById(payload.userId).select("-password")
        //req.user = user
        next()
    } catch (error) {
        throw new UnauthenticatedError('invalid authentication')
    }
}

//this will be invoked on the app, in the route set for all jobs' related routes 
module.exports = auth