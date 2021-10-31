const logger = (req,res,next) =>{
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear()

    console.log(method, url, time)
    next()
    //res.send("this was a middleware in action")
}
module.exports = logger