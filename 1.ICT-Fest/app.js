const express = require("express");
const app = express();


const userRouter = require("./routes/userRoutes");
const moRouter = require("./routes/eventRoutes/mathOlympiadRoutes");
const pcRouter = require("./routes/eventRoutes/programmingRoutes");

app.use(express.static("public"));


app.use(userRouter);
app.use(moRouter);
app.use(pcRouter);

module.exports = app;
