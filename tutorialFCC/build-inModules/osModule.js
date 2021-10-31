const os = require('os');

// user info 
const user = os.userInfo();
console.log(user)

// system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds `)

// system info 
const currentIOs = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}
console.log(currentIOs)