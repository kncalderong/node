const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"provide a name"], //the second argument is the err message provided
        trim: true,
        maxlength:[30,"limit of 30 characters exceeded"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Task",TaskSchema)