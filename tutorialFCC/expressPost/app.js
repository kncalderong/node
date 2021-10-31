const express = require('express');
const app = express();
const {people} = require('./data.js')
const auth = require('./routes/auth.js')


//to land the prebuild page
app.use(express.static('./methods-public'))

//to handle body request form on html plain
app.use(express.urlencoded({extended:false}))

//to handle json on post from JavaScript
app.use(express.json())

//use an imported routes file for
app.use('/login',auth)

//because the form action is to "/login" (html plane)
 app.post('/login',(req,res)=>{
    //console.log(req.body)
    const {name} = req.body
    if(name){
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send("Please provide credentials")
}) 

//post from javascript
app.post('/api/people',(req,res)=>{
    const{name}=req.body
    if(!name){
        res.status(400).json({success:false,msg:"please provide a name value"})
    }
    res.status(201).json({success:true,person:name}) // send back the name received to update the front names list
})

//post with postman
app.post('/api/postman/people',(req,res)=>{
    const{name}=req.body
    if(!name){
        res.status(400).json({success:false,msg:"please provide a name value"})
    }
    res.status(201).json({success:true,data:[...people,name]})
})

//Put method
app.put('/api/people/:id',(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;

    const person = people.find((person)=>{
        return person.id === +id
    })
    if(!person){
        res.status(404).json({success:false,msg:`person with id ${id} not found`})
    }
    const newPeople =people.map((person)=>{
        if(person.id === +id){
            person.name = name
        }
        return person
    })
    res.status(200).json({success:true,data:newPeople})
})

//Delete method
app.delete('/api/people/:id',(req,res)=>{
    const {id} = req.params;

    const person = people.find((person)=>{
        return person.id === +id
    })
    if(!person){
        res.status(404).json({success:false,msg:`person with id ${id} not found`})
    }
    const newPeople = people.filter((person)=>person.id!==+id)
    return res.status(200).json({success:true,data:newPeople})
})

//load the basic data
app.get('/api/people',(req,res)=>{
    res.status(200).json({
        success:true,
        data: people
    })
})

app.listen(5000,()=>{
    console.log("yes, my server is runmning on port 5000");
})