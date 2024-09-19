const http = require("http");

const server = http.createServer((req,res)=>{
   if(req.url === '/firstPage'){
      res.end("first page");
   }
   res.end("server is created");
})

server.listen(7000);