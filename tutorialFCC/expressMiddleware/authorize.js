const authorize = (req,res,next)=>{
    const {user} = req.query
    if(user === "jhon"){ //in the real world u will compare to the json webtoken
        req.user={name: "jhon",id: 3} /// even modify the req object
        next()
    } else {
        res.status(401).send("unauthorized")
    }
    
}

module.exports = authorize