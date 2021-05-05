const fs = require("fs");

const about = fs.readFileSync("./HTML/about.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});

const blog = fs.readFileSync("./HTML/blog.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});

const contact = fs.readFileSync("./HTML/contact.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});
const index = fs.readFileSync("./HTML/index.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});
const price = fs.readFileSync("./HTML/pricing.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});

const service = fs.readFileSync("./HTML/services.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});

const work = fs.readFileSync("./HTML/work.html","utf-8",(err,data) =>
{
    if(err)
    {
        console.log(err);
    }else{
        console.log(data);
    }
});

module.exports= {about,blog,contact,index,price,service,work};


