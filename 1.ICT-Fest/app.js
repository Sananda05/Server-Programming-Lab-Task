const express = require("express");
const app = express();


const userRouter = require("./routes/userRoutes");
const moRouter = require("./routes/eventRoutes/mathOlympiadRoutes")

app.use(express.static("public"));


app.use(userRouter);
app.use(moRouter);

module.exports = app;
