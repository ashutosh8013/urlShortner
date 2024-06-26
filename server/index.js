const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const Url = require("./models/Url");
var useragent = require("express-useragent");
// database connection
async function dbconnect(){
 await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("database connect"))
  .catch((e) => console.log("database not connected", e));
}

dbconnect();
// middleware
app.use(cors({ credentials: true,  origin: `https://ul-one.vercel.app` }));
app.use(useragent.express());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/authRoutes"));

const port = process.env.PORT||8000;
app.listen(port, () => console.log(`server is runnig on ${port}`));
