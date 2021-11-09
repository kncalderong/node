//Basic CRUD functionallity
const Job = require("../models/Job")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")

const getAllJobs = async (req,res) =>{
    const jobs = await Job.find({createdBy:req.user.userId}).sort("createdAt")
    
    res.status(StatusCodes.OK).json({
        jobs,
        count:jobs.length
    })
}

const getJob = async (req,res) =>{
    //here I assign each variable from req.user and req.params to a new variable
    const {user:{userId},params:{id:jobId}} = req 

    // !! always check both ids (job and user), to allow access only to the logged user
    const job = await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({job})

}

const createJob = async (req,res) =>{
    //this id comes from the authentication process, exactly from the req.user
    req.body.createdBy = req.user.userId;  
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res) =>{
    //destructure variables used
    const {
        body:{company,position},
        params:{id:jobId},
        user:{userId}
    } = req
    if(!company || !position){
        throw new BadRequestError("company and position must be provided")
    }
    const job = await Job.findByIdAndUpdate(
        {_id:jobId, createdBy:userId}, //find by id Job and user logged
        req.body, //new data
        {new: true, runValidators: true} //return the updated document, and stay to the validators
    )
    if(!job){
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req,res) =>{
    const {
        user:{userId},
        params:{id:jobId}
    } = req
    const job = await Job.findByIdAndRemove({
        _id:jobId, createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`Job with id ${jobId} not found`)
    }
    res.status(StatusCodes.OK).send("job deleted")    
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
