const EventEmitter = require('events') // this is a class 


const customEmitter = new EventEmitter(); // this is the instance

customEmitter.on('response',(name,id)=>{

    console.log(`data recevided ${name} with id: ${id}`);
})

// customEmitter.emit('response') would only console the firste onEmitter... is executed in order
customEmitter.on('response',()=>{
    console.log(`other logic`);
})

customEmitter.emit('response', 'jhon',35) //I can add arguments here