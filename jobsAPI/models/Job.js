const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"please provide a company"],
        maxlen:50
    },
    position:{
        type:String,
        required:[true,"please provide a position"],
        maxlen:100
    },
    state:{
        type:String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId, //to relate this new job with the userDocument that is creating it
        ref:"User",
        required:[true,"please provide a userId"]
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("Job",JobSchema)