var http = require("http");
const fs = require('fs');
const path = require('path')

const { readFile } = require('./file');

const hostname = "localhost";
const port = 8082;

http.createServer((req, res) => {

    console.log(req.headers);
    const filename = path.join(__dirname, 'index.html');
    readFile(filename)
        .then((data) => {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            fs.createReadStream(filename).pipe(res);
        })
        .catch((err) => {
            console.error('Error reading file:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);