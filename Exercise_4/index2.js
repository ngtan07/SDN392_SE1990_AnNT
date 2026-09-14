var http = require("http");
const path = require('path');
const { readFile } = require('./file');
const hostname = "localhost";
const port = 8082;
http.createServer((req, res) => {

    console.log(req.headers);

    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        var filePath = path.join(__dirname, 'public', fileUrl)

        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {

            readFile(filePath)
                .then((data) => {
                    res.setHeader('Content-Type', 'text/html');
                    res.statusCode = 200;
                    console.log('file:' + data);
                    res.end(data);
                })
                .catch((err) => {
                    console.error('Error reading file:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                })
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
    }
}).listen(port);

console.log(`Server running at http://${hostname}:${port}/`);