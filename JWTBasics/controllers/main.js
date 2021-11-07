//no need to try and catch... neither our own error-custom,
// because on the app.js we are using async-express errors
// but we use our own customError to handle the validation without mongodb or JOi
const {BadRequestError} = require("../errors")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const {username,password} = req.body
    if(!username || !password) {
        throw new BadRequestError("Please provide a username and password")
    }

    //just for this example, because the id is usually provided by the DB
    const id = new Date().getDate()

    //keep payload small(first object in the args)
    const token = jwt.sign(
        {id,username}, //payload
        process.env.JWT_SECRET, //secret, make it more complex than this example
        {expiresIn:"30d"} //options, here he includes an expiration limit
    )

    res.status(200).json({
        msg:"user created",
        token
    })
}

//authentication is build on auth middleware
const dashboard = async (req,res)=>{
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({
        msg:`Hello ${req.user.username}`,
        secret: `Here is your athorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports={
    login,
    dashboard
}