const http = require('http');

const server = http.createServer()

//request is an evente listened with 'on', by the server
server.on('request', (req, res) => {
    res.end("welcome")
})

server.listen(5000)