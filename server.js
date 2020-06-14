const express = require("express");
const fs = require("fs");
//Sets up the express app and port
const app = express();
var PORT = process.env.PORT || 8080;

//Sets up express app to handle parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//creating HTML route for notes.html
app.get("/notes", (req, res) => {
   const file = path.join(__dirname, "notes.html");
   res.sendFile(file);
});

//create index route for index.html
app.get("*", (req, res) => {
    const file = path.join(__dirname, "index.html");
    res.sendFile(file);
});