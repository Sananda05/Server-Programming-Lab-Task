const express = require("express");
const app = express();
const flash =require('connect-flash');
const session=require('express-session');
const passport=require('passport');


const userRouter = require("./routes/userRoutes");
const moRouter = require("./routes/eventRoutes/mathOlympiadRoutes");
const pcRouter = require("./routes/eventRoutes/programmingRoutes");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.use(userRouter);
app.use(moRouter);
app.use(pcRouter);

module.exports = app;
