const express = require("express");
const app = express();
const mongoose = require("mongoose");


const userRouter = require("./routes/userRoutes");

mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

app.use(userRouter);

module.exports=app;