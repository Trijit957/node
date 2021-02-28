const http = require('http');
const fs = require('fs');
const path = require('path');

const host = "localhost";

const port = 5000;

const server = http.createServer((req, res) => {
  if(req.method == 'GET') {
    var file_url;
    if(req.url == '/') {
      file_url = '/index.html';
    }
    else {
      file_url =  req.url;
    }

    var file_path = path.resolve('./public' + file_url);
    const file_ext = path.extname(file_path);
    if(file_ext == '.html')
    {
       fs.exists(file_path, (exist) => {
         if(!exist) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(`<html><body><h1><center>Error 404: ${file_url} not found! </center></h1></body></html>`);
         }
         else {
           res.statusCode = 200;
           res.setHeader('Content-Type', 'text/html');
           fs.createReadStream(file_path).pipe(res);
         }
       });
    }
    else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<html><body><h1><center>Error 404: ${file_url} is not a html file! </center></h1></body></html>`);
    }
  }

  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1><center>Error 404: ${req.method} method is not supported! </center></h1></body></html>`);
  }
})

server.listen(port, host, (err) => {
  if(!err) {
    console.log(`Server running at port: ${port}`);
  }
})