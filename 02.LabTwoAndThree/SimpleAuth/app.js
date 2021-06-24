const express = require("express");
const app = express();


const userRouter = require("./routes/userRoutes");

app.use(userRouter);

module.exports=app;