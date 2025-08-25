const express = require("express");   // Importing express
const path = require("path");
const {connectToMongoDB}=require("./connection"); // Connection function for making a connection between MongDB+express

const app = express(); //Created Express Server
const PORT = 8000; // Port on which the server is running

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()) //middleware
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.get("/favicon.ico",(req,res)=> res.status(204).end());

const pollRoute = require("./routes/poll");

connectToMongoDB("mongodb://localhost:27017/poll")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(`Error ${err}`));

app.use("/polls",pollRoute);

app.listen(PORT, () => {
    console.log("Server is Running on Port " + PORT);
});
