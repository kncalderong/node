const mongoose = require('mongoose');



const connectDB = (url) =>{
   return mongoose.connect(url,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    .then(()=>{console.log("connected to the db...")})
    .catch(err=>{console.log(err)}) 
}
module.exports = connectDB