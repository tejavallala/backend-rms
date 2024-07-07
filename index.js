const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const restuaruntRoute = require("./routes/restuaruntRoute");
const userRestaurantRoute = require("./routes/userRestuarantRoute");

const app = express();
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://user:123@cluster0.b3s8i1k.mongodb.net/project");
var db = mongoose.connection;
db.on("open", () => console.log("connected to db"));
db.on("error", () => console.log("Error occured"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/userRoute", userRoute);
app.use("/adminRoute", adminRoute);
app.use("/restaurant", restuaruntRoute);
app.use("/rest",userRestaurantRoute);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
