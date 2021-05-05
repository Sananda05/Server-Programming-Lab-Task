const HelloFunc = require("./helloWorld")

//HelloFunc.Hello();
//console.log(HelloFunc.name);

setInterval(()=>{
    console.log(HelloFunc.Hello());
},1000);

setTimeout(()=>{
    console.log(HelloFunc.name);
},5000);

//local module
//global module
//3rd party module