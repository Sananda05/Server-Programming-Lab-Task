const http = require("http");

const server = http.createServer((req, res) => {
  if(req.url == "/"){
      res.write("<h1>welcome to My World</h1>");
      res.end();
  }else if ( req.url == "/home")
  {
      res.write("<h1>This is my Home<h1>");
      res.end();
  }
  else{
      res.write("<h1>You're outside of my world. Please come here !</h1><br><a href = '/'>Sananda's World</a>");
      res.end();
  }
});

//module.exports={server};
server.listen(9070);
