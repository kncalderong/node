const User = require('../models/User')
const { StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req, res) =>{   

    //the hashing of the password is on a middleware on the mongoose model file
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({userName:user.name,token})

    //this validator here is optional, cause mongoose validators already are on
  /*
    if(!name || !email || !password){
        throw new BadRequestError("please provide name, email and password")
    } */
}

const login = async (req, res) =>{
    const {email, password} = req.body
    
    //check input values
    if(!email || !password){
        throw new BadRequestError("please provide email and password")
    }

    //check if this user exists
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Invalid credentials")
    }

    //check Passwords
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid credentials")
    }

    //create a token
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        user:{
            name:user.name
        },
        token
    })

}

module.exports = {
    register,
    login
}