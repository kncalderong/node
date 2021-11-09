const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide a name"],
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:[true,"please provide an email"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email"
        ],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        minLength:6
    }
})

//this is a mongoose middleware to hash the password before save it
UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt(10)
   //"this.password is refering to the new document being created"
    this.password = await bcrypt.hash(this.password, salt) 
    next()
})

//to create the token with "instance methods" from mongoose
UserSchema.methods.createJWT = function(){
    return jwt.sign(
        //this is pointing to that "user" called from the database
        {userId:this._id,name:this.name}, //payload
        process.env.JWT_SECRET, //secret
        {expiresIn:process.env.JWT_LIFETIME} //options
    )
}

//to compare the password login and that in database
UserSchema.methods.comparePassword = async function(candidatePassword){
    //this.password is the value retrieved from the database
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch
}

module.exports = mongoose.model("User",UserSchema)