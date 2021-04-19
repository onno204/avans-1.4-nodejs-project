const http = require('http')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({response: "Hello world!"}))
})

server.listen(port, undefined, () => {
    console.log(`Server running at http://...:${port}/`)
})