const http = require("http");
const file = require("./loadContents");

const myserver = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write(file.index);
    res.end();
  } else if (req.url == "/about") {
    res.write(file.about);
    res.end();
  } else if (req.url == "/blog") {
    res.write(file.blog);
    res.end();
  } else if (req.url == "/contact") {
    res.write(file.contact);
    res.end();
  } else if (req.url == "/priceing") {
    res.write(file.price);
    res.end();
  } else if (req.url == "/services") {
    res.write(file.service);
    res.end();
  } else if (req.url == "/work") {
    res.write(file.work);
    res.end();
  }else{
      res.write("<h1>Page doesn't exist</h1>");
      res.end();
  }
});

myserver.listen(2124);
