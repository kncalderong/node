const Task = require('../models/Task.js')
const asyncWrapper = require('../middleware/async.js')
const {createCustomError} = require("../errors/custom-error.js")

//all my functions to handle api.. 
const getAllTasks = async (req,res)=>{
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }    
}
// this is the alternative approach to avoid all trycatch code
const createTask = asyncWrapper(async(req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json(task)
})

/* const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({msg:error})
    }  
} */


const getTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params  // this is like const taskID = req.params.id
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg: `task with id: ${taskID} not found`}) //handles not found errors
            //always use return when handle two responses from the server
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error}) // handles syntax errors
    }    
}

//this is where I'll probe my new error management
const deleteTask = asyncWrapper( async (req,res,next)=>{
    const {id:taskID} =req.params
    const task = await Task.findOneAndDelete({ _id: taskID})   
    if(!task){
        //I create a new instance of error, and passed it to the next middleware (errorHandlerMiddleware)
        return next(createCustomError(`task with id: ${taskID} not found`,404))          
    }
    res.status(200).json({task})    
})
 
/*const deleteTask = async (req,res)=>{
    try {
        const {id:taskID} =req.params
        const task = await Task.findOneAndDelete({ _id: taskID})
        if(!task){
            return res.status(404).json({msg: `task with id: ${taskID} not found`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }    
} */


const updateTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID },req.body,{
            new: true,
            runValidators: true,
        })
        if(!task){
            return res.status(404).json({msg: `task with id: ${taskID} not found`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}