const http = require('http');
const HOST = '127.0.0.1';
const PORT = 9696;
http.createServer((req,res)=>{
  res.end("end")
}).listen(PORT,HOST)