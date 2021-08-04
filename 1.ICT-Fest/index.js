require(`dotenv`).config();
const PORT = process.env.PORT;
const app = require("./app");

const mongoose = require("mongoose");

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

app.listen(PORT, () => {
  console.log(`Server is running on port- ${PORT}.`);
});